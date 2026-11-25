import { useState, useEffect, useRef } from 'react';

const recipes = [
  { id: 1, title: 'Паста с томатным соусом', category: 'Основное', time: 30, servings: 4, rating: 4.8, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', ingredients: ['Паста', 'Томаты', 'Чеснок', 'Базилик', 'Оливковое масло'] },
  { id: 2, title: 'Салат Цезарь', category: 'Салаты', time: 20, servings: 2, rating: 4.6, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80', ingredients: ['Курица', 'Салат Латук', 'Сухарики', 'Сыр Пармезан', 'Соус Цезарь'] },
  { id: 3, title: 'Овощной суп', category: 'Супы', time: 45, servings: 6, rating: 4.9, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80', ingredients: ['Брокколи', 'Цветная капуста', 'Морковь', 'Картофель', 'Овощной бульон'] },
  { id: 4, title: 'Фруктовый салат', category: 'Десерт', time: 15, servings: 4, rating: 4.7, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', ingredients: ['Клубника', 'Манго', 'Банан', 'Мята', 'Мёд'] },
  { id: 5, title: 'Омлет с овощами', category: 'Завтрак', time: 15, servings: 2, rating: 4.5, image: 'https://images.unsplash.com/photo-1598880940041-238563326924?auto=format&fit=crop&w=800&q=80', ingredients: ['Яйца', 'Перец', 'Помидоры', 'Сыр', 'Сливочное масло'] },
];

const RecipeRolling = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);

  const autoPlay = () => {
    if (isHovered) return;
    timerRef.current = setTimeout(() => setCurrentIndex((prev) => (prev + 1) % recipes.length), 4000);
  };

  useEffect(() => { autoPlay(); return () => clearTimeout(timerRef.current); }, [currentIndex, isHovered]);

  const handleNext = () => { setCurrentIndex((prev) => (prev + 1) % recipes.length); clearTimeout(timerRef.current); };
  const handlePrev = () => { setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length); clearTimeout(timerRef.current); };
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX, diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) { if (diff > 0) handleNext(); else handlePrev(); }
    setTouchStart(null);
  };
  const formatTime = (m) => m < 60 ? `${m} мин` : `${Math.floor(m/60)} ч ${m%60} мин`;

  return (
    <div className="recipe-rolling" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="rolling-header">
        <h2>Популярные рецепты</h2>
        <div className="rolling-controls">
          <button onClick={handlePrev} className="rolling-btn prev"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2"/></svg></button>
          <span className="rolling-dots">{recipes.map((_, i) => <span key={i} className={i===currentIndex?'active':''}/>)}</span>
          <button onClick={handleNext} className="rolling-btn next"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2"/></svg></button>
        </div>
      </div>
      <div className="rolling-content">
        <div className="rolling-list" style={{ transform: `translateX(-${currentIndex*100}%)` }}>
          {recipes.map(recipe => (
            <div key={recipe.id} className="rolling-item">
              <div className="rolling-image"><img src={recipe.image} alt={recipe.title} loading="lazy"/></div>
              <div className="rolling-info">
                <span className="rolling-category">{recipe.category}</span>
                <h3>{recipe.title}</h3>
                <div className="rolling-meta">
                  <span><svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14" fill="none" stroke="currentColor" strokeWidth="2"/></svg>{formatTime(recipe.time)}</span>
                  <span><svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>{recipe.rating}</span>
                  <span><svg width="14" height="14" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2"/></svg>{recipe.servings} чел.</span>
                </div>
                <div className="rolling-ingredients">{recipe.ingredients.slice(0,3).map((ing,i)=><span key={i}>{ing}</span>)}{recipe.ingredients.length>3&&<span>+{recipe.ingredients.length-3}</span>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeRolling;
