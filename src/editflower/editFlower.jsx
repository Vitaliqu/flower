import React, { useContext, useState } from "react";
import styles from "./editflower.module.css";
import { editFlower, fetchFlower } from "../http/flowerApi.jsx";
import { Context } from "../main.jsx";
import spinner from "../assets/kOnzy.gif";

const EditFlower = ({ setEdit, id }) => {
  const { flower } = useContext(Context);
  const currentFlower = flower.flowers.find((element) => element.id === id);
  const [name, setName] = useState(currentFlower.name);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(currentFlower.price);
  const [categoryText, setCategoryText] = useState(
    !currentFlower.categoryId
      ? "Немає"
      : flower.categories.find(
          (element) => element.id === currentFlower.categoryId,
        ).name,
  );
  const [isNew, setIsNew] = useState(currentFlower.isNew);
  const [isPopular, setIsPopular] = useState(currentFlower.popular);
  const [description, setDescription] = useState(currentFlower.description);
  const [openCategory, setOpenCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(currentFlower.categoryId);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
      if (
        flower.flowers.find((element) => element.name === name) &&
        !currentFlower.name === name
      ) {
        alert("Категорія з такою назвою вже існує");
        return;
      }
      setIsLoading(true);
      const oldImageResponse = await fetch(
        import.meta.env.VITE_API +
          "/" +
          flower.flowers.find((element) => element.id === id).image,
      );
      const oldImageBlob = await oldImageResponse.blob();
      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", image ? image : oldImageBlob);
      formData.append("price", price);
      formData.append("isNew", isNew);
      formData.append("popular", isPopular);
      formData.append("description", description.replaceAll("\n", "<br/>"));
      if (!(categoryText === "Немає"))
        formData.append(
          "categoryId",
          flower.categories.find((element) => element.name === categoryText).id,
        );
      else formData.append("categoryId", "null");
      await editFlower(id, formData);
      const fetchedFlower = await fetchFlower(
        flower.currentCategory,
        flower.page,
        flower.limit,
        flower.filter,
      );
      flower.setFlowers(fetchedFlower.rows);
      setIsLoading(false);
      setEdit(false);
    } catch (error) {
      console.error("Error editing flower:", error);
      alert("Помилка при редагуванні позиції. Спробуйте ще раз.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setEdit(false)}>
          &times;
        </span>
        <h2>Редагувати позицію</h2>
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Ціна"
          value={price}
          onChange={handlePriceChange}
        />
        <textarea
          className={styles.description}
          value={description.replaceAll("<br/>", "\n")}
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
        <button onClick={handleSubmit}>Редагувати</button>
        {isLoading && <img className={styles.spinner} src={spinner} alt="" />}
      </div>
    </div>
  );
};

export default EditFlower;
