import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../main.jsx";
import { fetchCategory, fetchFlower } from "../http/flowerApi.jsx";
import { CATALOG_ROUTE, HOME_ROUTE } from "../utils/consts.jsx";
import useMediaQuery from "../Usemedia.jsx";
import DeleteFlower from "../deleteFlower/deleteFlower.jsx";
import CreateFlower from "../createFlower/CreateFlower.jsx";
import EditFlower from "../editflower/editFlower.jsx";
import styles from "./catalog.module.css";
import grid from "../assets/grid.png";
import wideGrid from "../assets/widegrid.png";
import dropDown from "../assets/dropdown.png";
import editImage from "../assets/edit.png";
import deleteImage from "../assets/delete.png";
import heart from "../assets/heart.png";
import spinner from "../assets/kOnzy.gif";
import activeHeart from "../assets/active-heart.png";
import Pagination from "@mui/material/Pagination";
import { ClickAwayListener } from "@mui/base";
import { catalogNavigate } from "../catalogNavigate.jsx";

const Catalog = observer(() => {
  const [isGrid, setIsGrid] = useState(
    localStorage.getItem("grid")
      ? JSON.parse(localStorage.getItem("grid"))
      : true,
  );
  localStorage.setItem("grid", isGrid);
  const isTablet = useMediaQuery("(max-width:992px)");
  const isMobile = useMediaQuery("(max-width:768px)");
  const { flower, user } = useContext(Context);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(flower.currentFilter);
  const [sortOpen, setSortOpen] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDelete] = useState(false);
  const [editId, setEditId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const url = new URL(location);
      const urlId = url.searchParams.get("category");
      const categories = await fetchCategory();

      if (
        path === "/catalog" &&
        urlId &&
        !categories.map((element) => `${element.id}`).includes(urlId)
      ) {
        flower.setCurrentCategory(undefined);
        navigate(HOME_ROUTE);
      }
      flower.setCategories(categories);
      if (urlId) flower.setCurrentCategory(parseInt(urlId));
      else flower.setCurrentCategory(undefined);
      if (
        !flower.categories
          .map((element) => element.id)
          .includes(flower.currentCategory)
      )
        flower.setCurrentCategory(undefined);
      const filterValue = url.searchParams.get("sort") || "isNew";
      const page = url.searchParams.get("page") || 1;
      flower.setFilter(filterValue);
      await flower.setPage(parseInt(page));
      const filterText = {
        isNew: "Новинки",
        popular: "Популярні",
        name: "Назва, А-Я",
        nameBack: "Назва, Я-А",
        expensive: "Ціна, найдорожчі",
        cheap: "Ціна, найдешевші",
      }[filterValue];
      if (filterText) setFilter(filterText);
      const count = await fetchFlower(
        flower.currentCategory,
        flower.page,
        flower.limit,
        flower.filter,
      );
      flower.setTotalCount(count.count);
      if (
        Math.ceil(flower.totalCount / flower.limit) &&
        flower.page > Math.ceil(flower.totalCount / flower.limit)
      ) {
        flower.setPage(1);
        catalogNavigate(flower, navigate, 1);
      }

      const flowers = await fetchFlower(
        flower.currentCategory,
        flower.page,
        flower.limit,
        flower.filter,
      );
      flower.setFlowers(flowers.rows);
    }
    fetchData()
      .then(() => flower.setLoading(false))
      .finally(() => setIsLoading(false));
  }, [useParams()]);

  const handleFilterChange = async (filter) => {
    setIsLoading(true);
    setFilter(filter);
    if (filter === "Новинки") {
      flower.setFilter("isNew");
    } else if (filter === "Популярні") {
      flower.setFilter("popular");
    } else if (filter === "Назва, А-Я") {
      flower.setFilter("name");
    } else if (filter === "Назва, Я-А") {
      flower.setFilter("nameBack");
    } else if (filter === "Ціна, найдорожчі") {
      flower.setFilter("expensive");
    } else if (filter === "Ціна, найдешевші") {
      flower.setFilter("cheap");
    }
    catalogNavigate(flower, navigate, flower.page);
    const flowers = await fetchFlower(
      flower.currentCategory,
      flower.page,
      flower.limit,
      flower.filter,
    );
    flower.setFlowers(flowers.rows);
  };

  const renderCategory = (element, id) => (
    <li
      key={id}
      className={styles.category}
      style={
        flower.currentCategory === element.id ? { color: "#79A03FFF" } : {}
      }
      onClick={() => handleCategoryClick(element)}
    >
      {element.name}
    </li>
  );
  const handleCategoryClick = async (category) => {
    setIsLoading(true);
    window.scroll(0, 0);
    flower.setCurrentCategory(category.id);
    flower.setPage(1);
    catalogNavigate(flower, navigate, 1);
    const data = await fetchFlower(
      category.id,
      flower.Page,
      flower.limit,
      flower.filter,
    );
    flower.setTotalCount(data.count);
    flower.setFlowers(data.rows);
    setIsLoading(false);
  };

  const renderSortTypes = () =>
    [
      "Новинки",
      "Популярні",
      "Назва, А-Я",
      "Назва, Я-А",
      "Ціна, найдорожчі",
      "Ціна, найдешевші",
    ].map((item) => (
      <li
        key={item}
        className={styles.filterType}
        style={filter === item ? { color: "#79A03FFF" } : {}}
        onClick={() => handleFilterChange(item)}
      >
        {item}
      </li>
    ));

  const renderFlowerCard = (element, id) => (
    <div key={id} className={styles.flowerCard}>
      <div className={styles.imageHolder}>
        {user._isAdmin && (
          <div className={styles.categoryAdmin}>
            <div
              className={styles.edit}
              onClick={() => handleEditClick(element.id)}
            >
              <img className={styles.editImage} src={editImage} alt="" />
            </div>
            <div
              className={styles.delete}
              onClick={() => handleDeleteClick(element.id)}
            >
              <img className={styles.deleteImage} src={deleteImage} alt="" />
            </div>
          </div>
        )}
        <img
          className={styles.cardImage}
          onClick={() => navigate(`/flower/${element.id}`)}
          src={import.meta.env.VITE_API + "/" + element.image}
          alt=""
        />
        {element.isNew && <div className={styles.new}>Новинка</div>}
      </div>
      <p className={styles.flowerName}>{element.name}</p>
      <div className={styles.cardDescription}>
        <div className={styles.priceWrapper}>
          <p className={styles.price}>
            {element.price &&
              element?.price
                .toLocaleString()
                .replaceAll(",", " ")
                .replaceAll(".", ",")}
          </p>
          <p className={styles.currency}>₴</p>
        </div>
        <img
          className={styles.heart}
          onClick={() => handleLikeClick(element.id)}
          src={flower.liked.includes(element.id) ? activeHeart : heart}
          alt=""
        />
      </div>
    </div>
  );

  const renderHorizontalFlowerCard = (element, id) => (
    <div className={styles.horizontalFlowerCard} key={id}>
      <div className={styles.horizontalImageHolder}>
        {user._isAdmin && (
          <div className={styles.categoryAdmin}>
            <div
              className={styles.edit}
              onClick={() => {
                setEditId(element.id);
                setEdit(true);
              }}
            >
              <img className={styles.editImage} src={editImage} alt="" />
            </div>
            <div
              className={styles.delete}
              onClick={() => {
                setDelete(true);
                setDeleteId(element.id);
              }}
            >
              <img className={styles.deleteImage} src={deleteImage} alt="" />
            </div>
          </div>
        )}
        <img
          className={styles.horizontalCardImage}
          src={import.meta.env.VITE_API + "/" + element.image}
          onClick={() => navigate(`/flower/${element.id}`)}
          alt=""
        />
        {element.isNew && <div className={styles.new}>Новинка</div>}
      </div>
      <div className={styles.horizontalInfo}>
        <p className={styles.horizontalFlowerName}>{element.name}</p>
        <div className={styles.horizontalDescriptionWrapper}>
          <div
            className={styles.flowerDescription}
            dangerouslySetInnerHTML={{ __html: element.description }}
          ></div>
          <div className={styles.horizontalCardDescription}>
            <div className={styles.horizontalPriceWrapper}>
              <p className={styles.horizontalPrice}>
                {element.price
                  .toLocaleString()
                  .replaceAll(",", " ")
                  .replaceAll(".", ",")}
              </p>
              <p className={styles.horizontalCurrency}>₴</p>
            </div>
            <img
              className={styles.horizontalHeart}
              onClick={() => handleLikeClick(element.id)}
              src={flower.liked.includes(element.id) ? activeHeart : heart}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );

  const handleEditClick = (id) => {
    setEditId(id);
    setEdit(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDelete(true);
  };
  const handleLikeClick = (id) => {
    if (!flower.liked.includes(id)) {
      flower.setLiked(flower.liked.concat(id));
      localStorage.setItem("liked", JSON.stringify(flower.liked));
    } else {
      flower.setLiked(flower.liked.filter((element) => element !== id));
      localStorage.setItem("liked", JSON.stringify(flower.liked));
    }
  };
  const handleChangePage = async (event, page) => {
    setIsLoading(true);
    window.scroll(0, 0);
    await catalogNavigate(flower, navigate, page);
    const flowers = await fetchFlower(
      flower.currentCategory,
      flower.page,
      flower.limit,
      flower.filter,
    );
    await flower.setFlowers(flowers.rows);
    setIsLoading(false);
  };

  const createFlowerCard = (isHorizontal = false) => (
    <div
      className={isHorizontal ? styles.horizontalFlowerCard : styles.flowerCard}
    >
      <div className={styles.imageHolder} onClick={() => setCreate(true)}>
        <p className={styles.createFlower}>
          Створити
          <br />
          позицію
        </p>
      </div>
    </div>
  );
  if (flower.loading) return <></>;
  return (
    <>
      {create && <CreateFlower setCreate={setCreate} />}
      {edit && <EditFlower id={editId} setEdit={setEdit} />}
      {del && <DeleteFlower id={deleteId} setDelete={setDelete} />}
      <div className={styles.catalog}>
        <ul className={styles.categorySelect}>
          {!isTablet && (
            <li
              style={
                flower.currentCategory === undefined
                  ? { color: "#79A03FFF" }
                  : {}
              }
              onClick={() => handleCategoryClick({ name: "" })}
              className={`${styles.category} ${path === CATALOG_ROUTE ? styles.activeCategory : ""}`}
            >
              Всі
            </li>
          )}
          {!isTablet && flower.categories.map(renderCategory)}
        </ul>
        <div className={styles.flowersWrapper}>
          <p className={styles.categoryLabel}>
            {flower.categories.find(
              (element) => element.id === flower.currentCategory,
            )?.name || "Всі"}
          </p>
          <div className={styles.sortMenu}>
            <div className={styles.gridLayout}>
              <>
                <img
                  className={styles.mobileGrid}
                  style={
                    !isGrid ? { opacity: 0, transform: "rotate(90deg)" } : {}
                  }
                  onClick={() => setIsGrid(!isGrid)}
                  src={grid}
                  alt=""
                />
                <img
                  className={styles.mobileWideGrid}
                  style={
                    !isGrid ? { opacity: 0.9, transform: "rotate(0deg)" } : {}
                  }
                  onClick={() => setIsGrid(!isGrid)}
                  src={wideGrid}
                  alt=""
                />
              </>
            </div>
            <div
              className={styles.sortWrapper}
              onClick={() => setSortOpen(!sortOpen)}
            >
              <p className={styles.sortText}> Відсортувати:</p>
              <ClickAwayListener
                onClickAway={() => sortOpen && setSortOpen(false)}
              >
                <div className={styles.sortDropdown}>
                  <p className={styles.currentFilter}>{filter}</p>
                  <img
                    style={sortOpen ? { transform: "rotate(0deg)" } : {}}
                    src={dropDown}
                    alt=""
                  />
                  <ul
                    style={
                      sortOpen
                        ? isMobile
                          ? { height: "18rem" }
                          : { height: "20rem" }
                        : {}
                    }
                    className={styles.sortTypes}
                  >
                    {renderSortTypes()}
                  </ul>
                </div>
              </ClickAwayListener>
            </div>
          </div>
          {!isLoading && !flower.flowers.length && (
            <div style={{ marginTop: "1rem" }}>Пусто</div>
          )}
          {isLoading ? (
            <img className={styles.spinner} src={spinner} alt="" />
          ) : isGrid ? (
            <div className={styles.flowersGrid}>
              {user._isAdmin && createFlowerCard()}
              {flower.flowers.map((flower, index) =>
                renderFlowerCard(flower, index),
              )}
            </div>
          ) : (
            <div className={styles.horizontalFlowersGrid}>
              {user._isAdmin && createFlowerCard(true)}
              {flower.flowers.map((flower, index) =>
                renderHorizontalFlowerCard(flower, index, true),
              )}
            </div>
          )}

          {flower.totalCount > flower.limit && (
            <Pagination
              page={flower.page}
              onChange={(event, page) => handleChangePage(event, page)}
              className={styles.pagination}
              count={Math.ceil(flower.totalCount / flower.limit)}
            />
          )}
        </div>
      </div>
    </>
  );
});

export default Catalog;
