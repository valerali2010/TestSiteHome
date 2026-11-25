import { useMemo, useState } from 'react'
import RecipeRolling from './components/RecipeRolling'
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  ChefHat,
  Clock3,
  Heart,
  Menu,
  Play,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react'

const categories = ['Все рецепты', 'Завтраки', 'Основные блюда', 'Салаты', 'Десерты', 'Вегетарианское']

const recipes = [
  {
    id: 1,
    title: 'Паста с томатами и бурратой',
    category: 'Основные блюда',
    time: 25,
    difficulty: 'Легко',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=88',
    description: 'Шёлковистая паста, сладкие томаты черри и нежная буррата — простой ужин с настроением итальянского лета.',
    ingredients: ['спагетти', 'томаты черри', 'буррата', 'базилик', 'чеснок'],
  },
  {
    id: 2,
    title: 'Тост с авокадо и яйцом',
    category: 'Завтраки',
    time: 15,
    difficulty: 'Легко',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=88',
    description: 'Хрустящий хлеб, кремовый авокадо и яйцо пашот для красивого начала дня.',
    ingredients: ['хлеб на закваске', 'авокадо', 'яйца', 'лимон', 'чили'],
  },
  {
    id: 3,
    title: 'Тёплый салат с лососем',
    category: 'Салаты',
    time: 30,
    difficulty: 'Средне',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=88',
    description: 'Сочный лосось, сезонная зелень и медово-горчичная заправка в одной яркой тарелке.',
    ingredients: ['лосось', 'микс салатов', 'стручковая фасоль', 'горчица', 'мёд'],
  },
  {
    id: 4,
    title: 'Тыквенный крем-суп',
    category: 'Вегетарианское',
    time: 40,
    difficulty: 'Легко',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=88',
    description: 'Согревающий суп с запечённой тыквой, кокосовым молоком и ароматными специями.',
    ingredients: ['тыква', 'кокосовое молоко', 'имбирь', 'лук', 'тыквенные семечки'],
  },
  {
    id: 5,
    title: 'Воздушные сырники с ягодами',
    category: 'Завтраки',
    time: 20,
    difficulty: 'Легко',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=88',
    description: 'Нежные сырники с золотистой корочкой, свежими ягодами и ложкой густого йогурта.',
    ingredients: ['творог', 'яйцо', 'рисовая мука', 'ваниль', 'ягоды'],
  },
  {
    id: 6,
    title: 'Грушевый тарт с миндалём',
    category: 'Десерты',
    time: 55,
    difficulty: 'Средне',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=1000&q=88',
    description: 'Рассыпчатое тесто, сочная груша и миндальный крем — десерт для неспешного чаепития.',
    ingredients: ['груши', 'миндаль', 'мука', 'сливочное масло', 'тростниковый сахар'],
  },
]

function RecipeCard({ recipe, saved, onSave, onOpen }) {
  return (
    <article className="recipe-card" onClick={() => onOpen(recipe)}>
      <div className="recipe-card__media">
        <img src={recipe.image} alt={recipe.title} />
        <button
          className={`save-button ${saved ? 'is-saved' : ''}`}
          onClick={(event) => { event.stopPropagation(); onSave(recipe.id) }}
          aria-label={saved ? 'Убрать из избранного' : 'Сохранить рецепт'}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <span className="recipe-card__category">{recipe.category}</span>
      </div>
      <div className="recipe-card__body">
        <h3>{recipe.title}</h3>
        <div className="recipe-meta">
          <span><Clock3 size={15} />{recipe.time} мин</span>
          <span><ChefHat size={15} />{recipe.difficulty}</span>
          <span className="rating"><Star size={14} fill="currentColor" />{recipe.rating}</span>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('Все рецепты')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState(new Set([2]))
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleRecipes = useMemo(() => recipes.filter((recipe) => {
    const matchesCategory = activeCategory === 'Все рецепты' || recipe.category === activeCategory
    const matchesSearch = recipe.title.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesSearch
  }), [activeCategory, query])

  function toggleSaved(id) {
    setSaved((current) => {
      const next = new Set(current)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Соль и хлеб — на главную">
          <span><UtensilsCrossed size={20} /></span>
          <strong>соль<span>&</span>хлеб</strong>
        </a>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`}>
          <a className="active" href="#recipes" onClick={() => setMenuOpen(false)}>Рецепты</a>
          <a href="#collections" onClick={() => setMenuOpen(false)}>Подборки</a>
          <a href="#season" onClick={() => setMenuOpen(false)}>Сезонное</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Журнал</a>
        </nav>
        <div className="header-actions">
          <button className="header-search" onClick={() => document.querySelector('.hero-search input')?.focus()}><Search size={18} /><span>Поиск</span></button>
          <button className="saved-link"><Bookmark size={18} /><span>Сохранено</span><i>{saved.size}</i></button>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Открыть меню">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="overline"><span />Готовим с удовольствием</p>
            <h1>Еда, которая<br />собирает <em>вместе.</em></h1>
            <p className="hero-description">Проверенные домашние рецепты, красивые сезонные блюда и немного вдохновения для вашей кухни.</p>
            <label className="hero-search">
              <Search size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти рецепт или ингредиент" />
              <span>Найти</span>
            </label>
            <div className="quick-tags">
              <span>Популярное:</span>
              {['Паста', 'Завтрак', 'Суп', 'Выпечка'].map((tag) => <button key={tag} onClick={() => setQuery(tag)}>{tag}</button>)}
            </div>
          </div>

          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1400&q=90" alt="Сервированный стол с сезонными блюдами" />
            <div className="hero-stamp"><span>Новые идеи</span><strong>каждую<br />неделю</strong></div>
            <button className="watch-button"><span><Play size={17} fill="currentColor" /></span><div><small>Смотреть рецепт</small><strong>Ужин за 30 минут</strong></div></button>
            <div className="hero-note"><span>Рецепт недели</span><strong>Запечённые овощи<br />с соусом тахини</strong><ArrowUpRight size={22} /></div>
          </div>
        </section>

        <section className="collections" id="collections">
          <div className="section-title-row">
            <div><span className="section-index">01</span><h2>Готовим сегодня</h2></div>
            <p>Три идеи для вкусного дня — от неспешного завтрака до уютного ужина.</p>
          </div>
          <div className="collection-grid">
            <article className="collection-card collection-card--large">
              <img src="https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=88" alt="Завтрак на деревянном столе" />
              <div className="collection-overlay"><span>Доброе утро</span><h3>Завтраки, ради которых хочется просыпаться</h3><button onClick={() => setActiveCategory('Завтраки')}>12 рецептов <ArrowRight size={17} /></button></div>
            </article>
            <article className="collection-card">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=88" alt="Ужин с друзьями" />
              <div className="collection-overlay"><span>Для своих</span><h3>Большой ужин с друзьями</h3><button>8 рецептов <ArrowRight size={17} /></button></div>
            </article>
            <article className="editor-note" id="journal">
              <span className="editor-note__icon">✦</span>
              <p>«Хорошая еда — это не сложность. Это свежие продукты, понятный рецепт и люди, с которыми хочется разделить стол.»</p>
              <div><span className="avatar-stack"><i /><i /><i /></span><small>Выбор редакции<br /><b>Ноябрь 2026</b></small></div>
            </article>
          </div>
        </section>

        <RecipeRolling />
        <section className="recipes-section" id="recipes">
          <div className="recipes-heading">
            <div><p className="overline"><span />Наша коллекция</p><h2>Рецепты на каждый день</h2></div>
            <button className="filter-button"><SlidersHorizontal size={17} />Фильтры</button>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>

          <div className="recipe-grid">
            {visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} saved={saved.has(recipe.id)} onSave={toggleSaved} onOpen={setSelectedRecipe} />)}
          </div>
          {!visibleRecipes.length && <div className="empty-recipes"><Search size={28} /><h3>Ничего не нашли</h3><p>Попробуйте другой запрос или выберите все рецепты.</p><button onClick={() => { setQuery(''); setActiveCategory('Все рецепты') }}>Сбросить фильтры</button></div>}
        </section>

        <section className="newsletter" id="season">
          <div className="newsletter-copy"><span className="newsletter-icon">✦</span><p className="overline">Письма со вкусом</p><h2>Один хороший рецепт<br />каждое воскресенье.</h2><p>Без спама и сложных ингредиентов. Только сезонные идеи, которые хочется повторить.</p></div>
          <form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Ваш e-mail" aria-label="Ваш e-mail" /><button>Подписаться <ArrowRight size={18} /></button></form>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><div className="logo"><span><UtensilsCrossed size={20} /></span><strong>соль<span>&</span>хлеб</strong></div><p>Готовим простую еду<br />и красивые воспоминания.</p></div>
        <div className="footer-links"><div><b>Разделы</b><a href="#recipes">Рецепты</a><a href="#collections">Подборки</a><a href="#journal">Журнал</a></div><div><b>Мы рядом</b><a href="#instagram">Instagram</a><a href="#telegram">Telegram</a><a href="#youtube">YouTube</a></div></div>
        <span className="footer-mark">есть<br />вкусно.</span>
      </footer>

      {selectedRecipe && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelectedRecipe(null)}>
          <article className="recipe-modal">
            <button className="modal-close" onClick={() => setSelectedRecipe(null)} aria-label="Закрыть"><X size={20} /></button>
            <div className="modal-photo"><img src={selectedRecipe.image} alt={selectedRecipe.title} /><button className={saved.has(selectedRecipe.id) ? 'is-saved' : ''} onClick={() => toggleSaved(selectedRecipe.id)}><Heart size={20} fill={saved.has(selectedRecipe.id) ? 'currentColor' : 'none'} /></button></div>
            <div className="modal-content"><span className="modal-category">{selectedRecipe.category}</span><h2>{selectedRecipe.title}</h2><p>{selectedRecipe.description}</p><div className="modal-stats"><span><Clock3 size={18} /><b>{selectedRecipe.time}</b> минут</span><span><ChefHat size={18} /><b>{selectedRecipe.difficulty}</b> сложность</span><span><Users size={18} /><b>2</b> порции</span></div><div className="ingredients"><h3>Что понадобится</h3><div>{selectedRecipe.ingredients.map((item) => <span key={item}>{item}</span>)}</div></div><button className="start-cooking">Начать готовить <ArrowRight size={18} /></button></div>
          </article>
        </div>
      )}
    </div>
  )
}

export default App
