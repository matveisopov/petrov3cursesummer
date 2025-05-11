const booksData = [
    { id: 1, title: 'React для профессионалов', author: 'Алексей Иванов', price: 1290, imageUrl: 'https://peopletalk.ru/wp-content/uploads/2017/09/Snimok-ekrana-2017-09-01-v-9.07.45.png', category: 'Программирование' },
    { id: 2, title: 'Современный JavaScript', author: 'Мария Петрова', price: 1450, imageUrl: 'https://www.devpulse.ru/wp-content/uploads/2013/10/clearcode.png', category: 'Программирование' },
    { id: 3, title: 'Искусство алгоритмов', author: 'Иван Сидоров', price: 1670, imageUrl: 'https://pikuco.ru/upload/test_stable/bb6/bb69551557a96db92fd1c501049c0f1f.webp', category: 'Алгоритмы' },
    { id: 4, title: 'Дизайн интерфейсов', author: 'Анна Смирнова', price: 1350, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ziK68JnyTZnYE73Xnu89aU2d8KWprI9nYQ&s', category: 'Дизайн' },
    { id: 5, title: 'Fullstack разработка', author: 'Дмитрий Васильев', price: 1890, imageUrl: 'https://news.store.rambler.ru/img/194f9892de04d32288a49570a109c7cd?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen', category: 'Веб-разработка' },
    { id: 6, title: 'Machine Learning Basics', author: 'John Doe', price: 2100, imageUrl: 'https://media.2x2tv.ru/content/images/2022/04/13f77689aef7e9ff9887121bcec0712a.jpg', category: 'AI' },
    { id: 7, title: 'Грокаем алгоритмы', author: 'Aditya Bhargava', price: 950, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDPUmvz2XrBmvB1rTmwxvF1gqoDlZw9cafWQ&s', category: 'Алгоритмы' },
    { id: 8, title: 'Чистая архитектура', author: 'Роберт Мартин', price: 1450, imageUrl: 'https://memchik.ru/images/templates/thumb_monkey_puppet.jpg', category: 'Программирование' },
    { id: 9, title: 'Рефакторинг', author: 'Мартин Фаулер', price: 1320, imageUrl: 'https://img-webcalypt.ru/uploads/admin/images/meme-templates/ioDVJCExphZnnOUHPtdd59HwwlsxQ1Ow.jpeg', category: 'Программирование' },
];

const BookCard = ({ title, author, price, imageUrl, category }) => (
    <div className="col-lg-4 col-md-6 mb-4 animated-card">
        <div className="card h-100">
            <img src={imageUrl} className="card-img-top" alt={title} />
            <div className="book-card-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary">{category}</span>
                    <i className="fas fa-heart text-muted"></i>
                </div>
                <h5 className="card-title fw-bold">{title}</h5>
                <p className="text-muted mb-1">{author}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="price-tag">{price} ₽</div>
                    <button className="btn btn-success">
                        <i className="fas fa-cart-plus me-2"></i>Купить
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const Banner = () => (
    <div className="banner">
        <h1 className="display-4 mb-3">Лучшие книги для разработчиков</h1>
        <p className="lead">Более 1000 книг в категориях программирования, дизайна и IT</p>
    </div>
);

const Filters = () => (
    <div className="row mb-4">
        <div className="col-md-3">
            <select className="form-select">
                <option>Все категории</option>
                <option>Программирование</option>
                <option>Алгоритмы</option>
                <option>Дизайн</option>
            </select>
        </div>
        <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Поиск по названию или автору..." />
        </div>
        <div className="col-md-3">
            <select className="form-select">
                <option>Сортировать по</option>
                <option>Цена ↑</option>
                <option>Цена ↓</option>
                <option>Название</option>
            </select>
        </div>
    </div>
);

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
            <a className="navbar-brand fw-bold" href="#">
                <i className="fas fa-book-open me-2"></i>BookStack
            </a>
            <div className="d-flex align-items-center">
                <Timer />
                <button className="btn btn-outline-light ms-3">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="ms-2">Корзина</span>
                </button>
            </div>
        </div>
    </nav>
);

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState(state => ({ seconds: state.seconds + 1 }));
    }

    render() {
        return (
            <div className="text-white me-3">
                <i className="fas fa-clock me-2"></i>
                {Math.floor(this.state.seconds/60)}m {this.state.seconds%60}s
            </div>
        );
    }
}

const App = () => (
    <div>
        <Navbar />
        <Banner />
        <main className="container">
            <Filters />
            <div className="row">
                {booksData.map(book => (
                    <BookCard key={book.id} {...book} />
                ))}
            </div>
        </main>
        <footer className="text-center py-4">
            <div className="container">
                <div className="d-flex justify-content-center gap-4 mb-3">
                    <a href="#" className="text-white"><i className="fab fa-vk fa-lg"></i></a>
                    <a href="#" className="text-white"><i className="fab fa-telegram fa-lg"></i></a>
                    <a href="#" className="text-white"><i className="fab fa-youtube fa-lg"></i></a>
                </div>
                <p className="mb-0">© 2025 BookStack. Все права не защищены</p>
            </div>
        </footer>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));