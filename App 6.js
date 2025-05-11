import React from 'react';

// Стили для приложения
const styles = {
  app: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#333'
  },
  header: {
    backgroundColor: '#fff',
    padding: '20px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    color: '#222'
  },
  section: {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#444',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  personalInfo: {
    display: 'flex',
    gap: '20px',
    fontSize: '16px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  infoLabel: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '5px'
  },
  toggleButton: {
    padding: '12px 24px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#333'
    }
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  productCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    }
  },
  productImage: {
    width: '100%',
    height: '300px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999'
  },
  productContent: {
    padding: '15px'
  },
  productTitle: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '8px'
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#000'
  },
  detailButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#0066cc',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0',
    marginBottom: '15px',
    textDecoration: 'underline'
  },
  addToCartButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#333'
    },
    '&:disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed'
    }
  },
  cart: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '30px'
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #eee'
  },
  cartItemInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  cartItemName: {
    fontWeight: '500'
  },
  cartItemPrice: {
    color: '#888',
    fontSize: '14px'
  },
  cartItemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px'
  },
  emptyCart: {
    textAlign: 'center',
    color: '#888',
    padding: '20px'
  }
};

// 1. Компонент с выводом ФИО и возраста через props
const PersonalInfo = ({ fullName, age }) => (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>Личная информация</h2>
    <div style={styles.personalInfo}>
      <div style={styles.infoItem}>
        <span style={styles.infoLabel}>ФИО</span>
        <span>{fullName}</span>
      </div>
      <div style={styles.infoItem}>
        <span style={styles.infoLabel}>Возраст</span>
        <span>{age} лет</span>
      </div>
    </div>
  </div>
);

// 2. Компонент с изменяемым состоянием
class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      buttonText: "Нажмите меня"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isOn: !prevState.isOn,
      buttonText: prevState.isOn ? "Нажмите меня" : "Активна"
    }));
  }

  render() {
    return (
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Кнопка с состоянием</h2>
        <button 
          onClick={this.handleClick}
          style={{
            ...styles.toggleButton,
            backgroundColor: this.state.isOn ? '#0066cc' : '#000'
          }}
        >
          {this.state.buttonText}
        </button>
      </div>
    );
  }
}

// 3. Компоненты для интернет-магазина
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      inCart: false
    };
  }

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  handleAddToCart = () => {
    this.setState({ inCart: true });
    this.props.onAddToCart(this.props.id);
  };

  render() {
    const { name, price, description, details } = this.props;
    return (
      <div style={styles.productCard}>
        <div style={styles.productImage}>
          {name}
        </div>
        <div style={styles.productContent}>
          <h3 style={styles.productTitle}>{name}</h3>
          <div style={styles.productPrice}>{price.toLocaleString()} ₽</div>
          <p>{description}</p>
          
          <button 
            onClick={this.toggleDetails}
            style={styles.detailButton}
          >
            {this.state.showDetails ? "Скрыть параметры" : "Все характеристики"}
          </button>
          
          {this.state.showDetails && (
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Характеристики:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                {details.map((detail, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            onClick={this.handleAddToCart}
            disabled={this.state.inCart}
            style={styles.addToCartButton}
          >
            {this.state.inCart ? "Добавлено в корзину" : "Добавить в корзину"}
          </button>
        </div>
      </div>
    );
  }
}

class Cart extends React.Component {
  increaseQuantity = (itemId) => {
    this.props.onIncreaseQuantity(itemId);
  };

  decreaseQuantity = (itemId) => {
    this.props.onDecreaseQuantity(itemId);
  };

  render() {
    const { items } = this.props;
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return (
      <div style={styles.cart}>
        <h2 style={styles.sectionTitle}>Корзина</h2>
        {items.length === 0 ? (
          <div style={styles.emptyCart}>Ваша корзина пуста</div>
        ) : (
          <div>
            {items.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.cartItemInfo}>
                  <span style={styles.cartItemName}>{item.name}</span>
                  <span style={styles.cartItemPrice}>{item.price.toLocaleString()} ₽ × {item.quantity}</span>
                </div>
                <div style={styles.cartItemActions}>
                  <button 
                    onClick={() => this.decreaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => this.increaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div style={{ 
              marginTop: '20px', 
              paddingTop: '15px', 
              borderTop: '1px solid #eee',
              textAlign: 'right',
              fontWeight: '700',
              fontSize: '18px'
            }}>
              Итого: {total.toLocaleString()} ₽
            </div>
          </div>
        )}
      </div>
    );
  }
}

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      products: [
        {
          id: 1,
          name: 'Смартфон Premium X',
          price: 79990,
          description: 'Флагманский смартфон с лучшей камерой на рынке',
          details: [
            'Экран: 6.7" Dynamic AMOLED 2X',
            'Процессор: Snapdragon 8 Gen 2',
            'Память: 256 ГБ',
            'Камера: 200 МП + 50 МП + 12 МП',
            'Аккумулятор: 5000 мАч'
          ]
        },
        {
          id: 2,
          name: 'Ноутбук Ultra Slim',
          price: 129990,
          description: 'Ультратонкий ноутбук с сенсорным экраном',
          details: [
            'Экран: 14" 4K Touch',
            'Процессор: Intel Core i9',
            'Оперативная память: 32 ГБ',
            'SSD: 1 ТБ',
            'Вес: 1.1 кг'
          ]
        },
        {
          id: 3,
          name: 'Беспроводные наушники Pro',
          price: 24990,
          description: 'Наушники с активным шумоподавлением',
          details: [
            'Активное шумоподавление',
            'Время работы: 30 часов',
            'Водозащита: IPX4',
            'Bluetooth 5.2',
            'Микрофоны: 6 штук'
          ]
        }
      ]
    };
  }

  handleAddToCart = (productId) => {
    const product = this.state.products.find(p => p.id === productId);
    const existingItem = this.state.cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(item =>
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      }));
    } else {
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, { ...product, quantity: 1 }]
      }));
    }
  };

  handleIncreaseQuantity = (itemId) => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.map(item =>
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    }));
  };

  handleDecreaseQuantity = (itemId) => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems
        .map(item =>
          item.id === itemId 
            ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
            : item
        )
        .filter(item => item.quantity > 0)
    }));
  };

  render() {
    return (
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Наши товары</h2>
        
        <div style={styles.productGrid}>
          {this.state.products.map(product => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              details={product.details}
              onAddToCart={this.handleAddToCart}
            />
          ))}
        </div>
        
        <Cart 
          items={this.state.cartItems} 
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
        />
      </div>
    );
  }
}

// Главный компонент приложения
class App extends React.Component {
  render() {
    return (
      <div style={styles.app}>
        <header style={styles.header}>
          <h1 style={styles.title}>Fashion Store</h1>
        </header>
        
        <PersonalInfo fullName="Иванов Иван Иванович" age={25} />
        <ToggleButton />
        <Shop />
      </div>
    );
  }
}

export default App;