// Основная функция приложения
function App() {
    // Личные данные пользователя
    const firstName = "Сопов";
    const lastName = "Матвей";
    const age = 19;

    // Состояния для калькулятора
    const [display, setDisplay] = React.useState('0');
    const [equation, setEquation] = React.useState('');
    const [lastOperation, setLastOperation] = React.useState(null);

    // Функции для математических операций
    const handleNumber = (num) => {
        if (display === '0') {
            setDisplay(num.toString());
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperation = (op) => {
        if (lastOperation) {
            calculate();
        }
        setLastOperation(op);
        setEquation(display + ' ' + op);
        setDisplay('0');
    };

    const calculate = () => {
        if (!lastOperation) return;
        
        const num1 = parseFloat(equation.split(' ')[0]);
        const num2 = parseFloat(display);
        let result;

        switch (lastOperation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '%':
                result = num1 % num2;
                break;
            case '^':
                result = Math.pow(num1, num2);
                break;
            default:
                return;
        }

        setDisplay(result.toString());
        setEquation('');
        setLastOperation(null);
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
        setLastOperation(null);
    };

    const handleSpecial = (action) => {
        const num = parseFloat(display);
        switch (action) {
            case 'sqrt':
                setDisplay(Math.sqrt(num).toString());
                break;
            case 'sin':
                setDisplay(Math.sin(num).toString());
                break;
            case 'cos':
                setDisplay(Math.cos(num).toString());
                break;
            case 'tan':
                setDisplay(Math.tan(num).toString());
                break;
            case 'log':
                setDisplay(Math.log10(num).toString());
                break;
            case 'ln':
                setDisplay(Math.log(num).toString());
                break;
        }
    };

    // Массив с данными людей
    const people = [
        { id: 1, name: 'Дмитрий Соколов', year: 1992, profession: 'Архитектор', photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Елена Морозова', year: 1987, profession: 'Психолог', photo: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Андрей Козлов', year: 1995, profession: 'Маркетолог', photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'Ольга Волкова', year: 1990, profession: 'Юрист', photo: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: 5, name: 'Иван Николаев', year: 1988, profession: 'Бизнес-аналитик', photo: 'https://randomuser.me/api/portraits/men/5.jpg' },
    ];

    // Состояния для фильтрации и сортировки
    const [filter, setFilter] = React.useState('');
    const [sortBy, setSortBy] = React.useState('name');

    // Фильтрация и сортировка списка людей
    const filteredPeople = people
        .filter(person => 
            person.profession.toLowerCase().includes(filter.toLowerCase()) ||
            person.year.toString().includes(filter)
        )
        .sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'year') {
                return a.year - b.year;
            } else {
                return a.profession.localeCompare(b.profession);
            }
        });

    // Возвращаем разметку приложения
    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', backgroundColor: '#e6f7ff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            {/* Заголовок с приветствием */}
            <h1 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>Привет, {firstName} {lastName}!</h1>
            <p style={{ color: '#4a4a4a', fontSize: '1.2rem' }}>Возраст: {age}</p>

            {/* Блок калькулятора */}
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff5f5', borderRadius: '8px' }}>
                <h2 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>(не) Научный калькулятор)</h2>
                
                {/* Дисплей */}
                <div style={{ 
                    backgroundColor: '#fff', 
                    padding: '1rem', 
                    marginBottom: '1rem', 
                    borderRadius: '4px',
                    textAlign: 'right',
                    fontSize: '1.5rem',
                    minHeight: '2rem'
                }}>
                    {equation} {display}
                </div>

                {/* Основные кнопки */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                    {/* Цифры */}
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'].map(num => (
                        <button 
                            key={num} 
                            onClick={() => handleNumber(num)}
                            style={{ backgroundColor: '#ff6b6b', color: 'white' }}
                        >
                            {num}
                        </button>
                    ))}

                    {/* Основные операции */}
                    {['+', '-', '*', '/', '%', '^'].map(op => (
                        <button 
                            key={op} 
                            onClick={() => handleOperation(op)}
                            style={{ backgroundColor: '#ff6b6b', color: 'white' }}
                        >
                            {op}
                        </button>
                    ))}

                    {/* Специальные функции */}
                    {['sqrt', 'sin', 'cos', 'tan', 'log', 'ln'].map(func => (
                        <button 
                            key={func} 
                            onClick={() => handleSpecial(func)}
                            style={{ backgroundColor: '#ff6b6b', color: 'white' }}
                        >
                            {func}
                        </button>
                    ))}

                    {/* Управляющие кнопки */}
                    <button onClick={calculate} style={{ backgroundColor: '#ff6b6b', color: 'white' }}>=</button>
                    <button onClick={handleClear} style={{ backgroundColor: '#ff6b6b', color: 'white' }}>C</button>
                </div>
            </div>

            {/* Блок справочника персоналий */}
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff5f5', borderRadius: '8px' }}>
                <h2 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>Справочник персоналий</h2>
                {/* Поле фильтрации */}
                <input 
                    type="text" 
                    placeholder="Фильтр по профессии или году" 
                    onChange={(e) => setFilter(e.target.value)} 
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ff6b6b' }}
                />
                {/* Выпадающий список сортировки */}
                <select 
                    onChange={(e) => setSortBy(e.target.value)} 
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ff6b6b' }}
                >
                    <option value="name">Сортировать по имени</option>
                    <option value="year">Сортировать по году</option>
                    <option value="profession">Сортировать по профессии</option>
                </select>
                {/* Список людей */}
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredPeople.map(person => (
                        <li key={person.id} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '1rem', 
                            marginBottom: '0.5rem', 
                            backgroundColor: '#ffe6e6',
                            borderRadius: '4px'
                        }}>
                            <img 
                                src={person.photo} 
                                alt={person.name} 
                                style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    borderRadius: '50%',
                                    marginRight: '1rem',
                                    objectFit: 'cover'
                                }} 
                            />
                            <div>
                                <strong style={{ color: '#ff6b6b' }}>{person.name}</strong> - {person.year} - {person.profession}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Запуск приложения
ReactDOM.render(<App />, document.getElementById('app'));