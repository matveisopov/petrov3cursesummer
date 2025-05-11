import React, { useState } from "react";

const dishes = [
  { id: 1, name: "Салат Цезарь с курицей", price: "250₽", ingredients: "Курица, салат ромэн, пармезан, сухарики, соус Цезарь", img: "https://avatars.mds.yandex.net/i?id=5b20f0b9c49a3dd68b9dcfbe17da8996d6ffc7de-9097894-images-thumbs&n=13" },
  { id: 2, name: "Суп-пюре из тыквы", price: "180₽", ingredients: "Тыква, сливки, морковь, лук, специи", img: "https://via.placeholder.com/300x200?text=Тыква" },
  { id: 3, name: "Паста Карбонара", price: "320₽", ingredients: "Спагетти, бекон, сливки, яйцо, пармезан", img: "https://via.placeholder.com/300x200?text=Карбонара" },
  { id: 4, name: "Пицца Маргарита", price: "400₽", ingredients: "Тесто, томаты, моцарелла, базилик", img: "https://via.placeholder.com/300x200?text=Маргарита" },
  { id: 5, name: "Оливье с говядиной", price: "210₽", ingredients: "Говядина, картофель, морковь, горошек, майонез", img: "https://via.placeholder.com/300x200?text=Оливье" },
  { id: 6, name: "Греческий салат", price: "190₽", ingredients: "Огурцы, помидоры, фета, маслины, лук, оливковое масло", img: "https://via.placeholder.com/300x200?text=Греческий" },
  { id: 7, name: "Бефстроганов с картофельным пюре", price: "350₽", ingredients: "Говядина, сливки, лук, грибы, картофель", img: "https://via.placeholder.com/300x200?text=Бефстроганов" },
  { id: 8, name: "Сёмга на гриле", price: "520₽", ingredients: "Сёмга, лимон, специи, овощи гриль", img: "https://via.placeholder.com/300x200?text=Сёмга" },
  { id: 9, name: "Плов с бараниной", price: "330₽", ingredients: "Баранина, рис, морковь, лук, специи", img: "https://via.placeholder.com/300x200?text=Плов" },
  { id: 10, name: "Куриные котлеты с гречкой", price: "210₽", ingredients: "Курица, лук, гречка, специи", img: "https://via.placeholder.com/300x200?text=Котлеты" },
  { id: 11, name: "Ризотто с грибами", price: "270₽", ingredients: "Рис, грибы, сливки, пармезан, лук", img: "https://via.placeholder.com/300x200?text=Ризотто" },
  { id: 12, name: "Сырники со сметаной", price: "160₽", ingredients: "Творог, яйцо, мука, сахар, сметана", img: "https://via.placeholder.com/300x200?text=Сырники" },
  { id: 13, name: "Шашлык из свинины", price: "390₽", ingredients: "Свинина, лук, специи, зелень", img: "https://via.placeholder.com/300x200?text=Шашлык" },
  { id: 14, name: "Блины с красной икрой", price: "280₽", ingredients: "Блины, красная икра, сливочное масло", img: "https://via.placeholder.com/300x200?text=Блины" },
  { id: 15, name: "Медовик", price: "150₽", ingredients: "Мёд, мука, яйца, сахар, сметана", img: "https://via.placeholder.com/300x200?text=Медовик" },
];

function Header() {
  return (
    <header style={{
      background: "#4b2e83",
      color: "#fff",
      padding: "20px 0",
      textAlign: "center",
      marginBottom: "24px"
    }}>
      <h1 style={{ margin: 0, fontSize: "2.2rem", letterSpacing: "2px" }}>Ресторан "Вкусно и Точка"</h1>
      <nav style={{ marginTop: "12px" }}>
        <a href="#" style={{ color: "#fff", margin: "0 16px", textDecoration: "none", fontWeight: "bold" }}>Меню</a>
        <a href="#" style={{ color: "#fff", margin: "0 16px", textDecoration: "none" }}>О нас</a>
        <a href="#" style={{ color: "#fff", margin: "0 16px", textDecoration: "none" }}>Контакты</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#4b2e83",
      color: "#fff",
      textAlign: "center",
      padding: "16px 0",
      marginTop: "32px"
    }}>
      <div>© 2024 Ресторан "Вкусно и Точка". Все права защищены.</div>
    </footer>
  );
}

function Menu() {
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      background: "#f7f7f7",
      padding: "32px",
      justifyContent: "center"
    }}>
      {dishes.map((dish) => (
        <div
          key={dish.id}
          style={{
            width: "300px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "16px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            cursor: "pointer",
            transition: "box-shadow 0.2s",
            position: "relative"
          }}
          onClick={() => setSelectedDish(dish)}
        >
          <img
            src={dish.img}
            alt={dish.name}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }}
          />
          <h3 style={{ margin: "0 0 8px 0" }}>{dish.name}</h3>
          {selectedDish && selectedDish.id === dish.id ? (
            <div>
              <p><b>Цена:</b> {dish.price}</p>
              <p><b>Ингредиенты:</b> {dish.ingredients}</p>
              <button
                style={{
                  marginTop: "8px",
                  background: "#b22222",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 16px",
                  cursor: "pointer"
                }}
                onClick={e => { e.stopPropagation(); setSelectedDish(null); }}
              >
                Скрыть
              </button>
            </div>
          ) : (
            <button
              style={{
                marginTop: "8px",
                background: "#8b4513",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 16px",
                cursor: "pointer"
              }}
              onClick={e => { e.stopPropagation(); setSelectedDish(dish); }}
            >
              Подробнее
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}