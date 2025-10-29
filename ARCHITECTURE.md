# Архитектура проекта Cinema

Проект следует принципам **Feature-Sliced Design (FSD)** с четким разделением ответственности между слоями.

## 📁 Структура слоев

### 🏗️ **app/** - Слой приложения
- `router.tsx` - настройка роутинга
- `providers/` - провайдеры (React Query, etc.)

### 📄 **pages/** - Слой страниц
Композиция фич и виджетов для конкретных страниц:
- `films-page/` - страница списка фильмов
- `cinemas-page/` - страница списка кинотеатров  
- `movie-page/` - страница сеансов фильма
- `cinema-page/` - страница сеансов кинотеатра

### 🧩 **widgets/** - Слой виджетов
Самостоятельные композитные блоки:
- `sidebar/` - боковая навигация
- `page-title/` - заголовок страницы

### ⚡ **features/** - Слой фич (бизнес-логика)
Содержит бизнес-логику и сложные операции:

#### `movie-sessions-grouping/`
Группировка сеансов фильма по кинотеатрам:
- `api/useGroupedMovieSessionsQuery.ts` - хук для получения сгруппированных данных
- `lib/groupSessionsByCinemas.ts` - функция группировки
- `model/types.ts` - типы для группированных данных

#### `cinema-sessions-grouping/`
Группировка сеансов кинотеатра по фильмам:
- `api/useGroupedCinemaSessionsQuery.ts` - хук для получения сгруппированных данных
- `lib/groupSessionsByMovies.ts` - функция группировки
- `model/types.ts` - типы для группированных данных

### 🎯 **entities/** - Слой бизнес-сущностей
"Тупые" сущности с простыми API запросами:

#### `movies/`
- `api/getMovies.ts` - простой запрос списка фильмов
- `model/types.ts` - тип Movie
- `ui/movie-list.tsx` - компонент списка (без навигации)

#### `cinemas/`
- `api/getCinemas.ts` - простой запрос списка кинотеатров
- `model/types.ts` - тип Cinema
- `ui/cinema-list.tsx` - компонент списка (без навигации)

#### `movie-sessions/`
- `api/getMovieSessionsQuery.ts` - простой запрос сеансов фильма
- `model/types.ts` - тип MovieSession
- `ui/movie-sessions.tsx` - компонент отображения (использует features)

#### `cinema-sessions/`
- `api/getCinemaSessionsQuery.ts` - простой запрос сеансов кинотеатра
- `model/types.ts` - тип MovieSession
- `ui/cinema-sessions.tsx` - компонент отображения (использует features)

### 🔧 **shared/** - Переиспользуемый код
- `api/` - базовые API утилиты
- `components/ui/` - UI компоненты
- `config/` - конфигурация (API_URL, etc.)
- `lib/` - утилиты

## 🎯 Принципы архитектуры

### ✅ **Правильное разделение ответственности:**

1. **Entities** - только простые API запросы и базовые типы
2. **Features** - бизнес-логика группировки и сложные операции
3. **Pages** - композиция и навигация
4. **Widgets** - самостоятельные блоки
5. **Shared** - переиспользуемый код

### ✅ **Правила импортов:**

```typescript
// ✅ Хорошо: entities используют только shared
import { baseFetch } from "@/shared/api/baseFetch";

// ✅ Хорошо: features используют entities и shared
import { useMovieSessionsQuery } from "@/entities/movie-sessions";
import { useCinemasQuery } from "@/entities/cinemas";

// ✅ Хорошо: pages используют features, widgets, entities
import { useGroupedMovieSessionsQuery } from "@/features/movie-sessions-grouping";

// ❌ Плохо: entities не должны использовать features
import { useGroupedMovieSessionsQuery } from "@/features/movie-sessions-grouping";
```

### ✅ **Компоненты entities без навигации:**

```typescript
// ✅ Хорошо: принимают обработчики через props
interface MovieListProps {
  onMovieClick: (movieId: number) => void;
}

// ❌ Плохо: используют useNavigate напрямую
const navigate = useNavigate();
```

## 🔄 Поток данных

1. **Entities** делают простые API запросы
2. **Features** комбинируют данные из entities и применяют бизнес-логику
3. **Pages** используют features и передают обработчики в entities
4. **UI компоненты** остаются переиспользуемыми

## 🚀 Преимущества

- ✅ Четкое разделение ответственности
- ✅ Переиспользуемые entities
- ✅ Тестируемая бизнес-логика в features
- ✅ Простота поддержки и расширения
- ✅ Соответствие принципам FSD
