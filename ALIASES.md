# Алиасы импортов (Path Aliases)

В проекте настроены алиасы для удобного импорта модулей в соответствии с Feature-Sliced Design архитектурой.

## 📋 Доступные алиасы

| Алиас | Путь | Описание |
|-------|------|----------|
| `@/*` | `./src/*` | Корень src директории |
| `@/app/*` | `./src/app/*` | Слой приложения (роутинг, провайдеры) |
| `@/pages/*` | `./src/pages/*` | Слой страниц |
| `@/widgets/*` | `./src/widgets/*` | Слой виджетов (композиты) |
| `@/features/*` | `./src/features/*` | Слой фич (бизнес-логика) |
| `@/entities/*` | `./src/entities/*` | Слой бизнес-сущностей |
| `@/shared/*` | `./src/shared/*` | Переиспользуемый код |

## 💡 Примеры использования

### ❌ Было (длинные относительные пути):

```typescript
import { MovieList } from "../../../entities/movies";
import { Button } from "../../../shared/components/ui/button";
import { getImageUrl } from "../../../shared/config";
import FilmsPage from "../pages/films-page/ui/films-page";
```

### ✅ Стало (короткие алиасы):

```typescript
import { MovieList } from "@/entities/movies";
import { Button } from "@/shared/components/ui/button";
import { getImageUrl } from "@/shared/config";
import FilmsPage from "@/pages/films-page/ui/films-page";
```

## 🔧 Конфигурация

Алиасы настроены в следующих файлах:

1. **vite.config.ts** - для резолва модулей в Vite
2. **tsconfig.json** - для TypeScript в корне проекта
3. **tsconfig.app.json** - для TypeScript в приложении

## 📝 Правила использования

1. **Используйте алиасы** для импортов из других слоев FSD
2. **Используйте относительные пути** для импортов внутри одного модуля:
   ```typescript
   // ✅ Хорошо: внутри entities/movies
   import { useMoviesQuery } from "../api/getMovies";
   import type { Movie } from "../model/types";
   ```

3. **Всегда используйте Public API** (index.ts) при импорте между слоями:
   ```typescript
   // ✅ Хорошо
   import { MovieList } from "@/entities/movies";
   
   // ❌ Плохо
   import { MovieList } from "@/entities/movies/ui/movie-list";
   ```

## 🎯 Преимущества

- ✅ Короткие и читаемые импорты
- ✅ Не нужно считать уровни вложенности (`../../..`)
- ✅ Легко переносить файлы без изменения импортов
- ✅ Понятно, из какого слоя идет импорт
- ✅ Соответствует стандартам FSD

## 🔄 После изменения файлов

Если вы видите ошибки TypeScript после создания новых файлов:

1. Перезапустите TypeScript сервер в IDE
2. Или перезапустите dev сервер: `npm run dev`

