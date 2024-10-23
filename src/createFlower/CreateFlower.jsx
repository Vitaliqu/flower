import React, { useContext, useState } from "react";
import styles from "./CreateFlower.module.css";
import {
  createCategory,
  createFlower,
  fetchCategory,
  fetchFlower,
} from "../http/flowerApi.jsx";
import { Context } from "../main.jsx";
import Compressor from "compressorjs";
import spinner from "../assets/kOnzy.gif";

const CreateFlower = ({ setCreate }) => {
  const { flower } = useContext(Context);
  const [forceRender, setForceRender] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categoryText, setCategoryText] = useState(
    !flower.currentCategory
      ? "Немає"
      : flower.categories.find(
          (element) => element.id === flower.currentCategory,
        ).name,
  );
  const [isNew, setIsNew] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.8,
      success: (compressedResult) => {
        setImage(compressedResult);
      },
    });
  };

  const handleNewChange = (e) => {
    setIsNew(e.target.checked);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePopularChange = (e) => {
    setIsPopular(e.target.checked);
  };
  const handleSubmit = async () => {
    try {
      if (!name) {
        alert("Назва відсутня");
        return;
      }
      if (!image) {
        alert("Фотографія не вибрана");
        return;
      }
      if (
        price === null ||
        price === "" ||
        price.trim().length === 0 ||
        isNaN(Number(price)) ||
        Number(price) < 0
      ) {
        alert("Ціна вказана неправильно");
        return;
      }

      if (flower.flowers.find((element) => element.name === name)) {
        alert("Категорія з такою назвою вже існує");
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("isNew", isNew);
      formData.append("popular", isPopular);
      formData.append("description", description.replaceAll("\n", "<br/>"));
      !(categoryText === "Категорія" || categoryText === "Немає")
        ? formData.append(
            "categoryId",
            flower.categories.find((element) => element.name === categoryText)
              .id,
          )
        : null;
      await createFlower(formData);
      const fetchedFlower = await fetchFlower(
        flower.currentCategory,
        flower.page,
        flower.limit,
        flower.filter,
      );
      flower.setFlowers(fetchedFlower.rows);
      setIsLoading(false);
      setCreate(false);
    } catch (error) {
      console.error("Error creating flower:", error);
      alert("Помилка при створенні позиції. Спробуйте ще раз.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setCreate(false)}>
          &times;
        </span>
        <h2>Додати позицію</h2>
        <div
          className={styles.chouseCategory}
          onClick={() => setOpenCategory(!openCategory)}
        >
          {categoryText}
          {openCategory && (
            <ul className={styles.categoryList}>
              <li
                onClick={() => {
                  setOpenCategory(false);
                  setCategoryText("Немає");
                }}
              >
                Немає
              </li>
              {flower.categories.map((element, id) => (
                <li
                  key={id}
                  onClick={() => {
                    setOpenCategory(false);
                    setCategoryText(element.name);
                  }}
                >
                  {element.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          placeholder="Назва"
          value={name}
          onChange={handleNameChange}
        />
        <input type={"file"} accept={"image/*"} onChange={handleImageChange} />
        <input type="text" placeholder="Ціна" onChange={handlePriceChange} />
        <textarea
          className={styles.description}
          placeholder="Опис"
          onChange={handleDescriptionChange}
        />
        <div className={styles.Wrapper}>
          <p className={styles.Label}>Новинка</p>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isNew}
            onChange={handleNewChange}
          />
        </div>
        <div className={styles.Wrapper}>
          <p className={styles.Label}>Популярне</p>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isPopular}
            onChange={handlePopularChange}
          />
        </div>
        <button onClick={handleSubmit}>Створити</button>
        {isLoading && <img className={styles.spinner} src={spinner} alt="" />}
      </div>
    </div>
  );
};

export default CreateFlower;
