export interface Category {
  name: string;
  color: string;
}

interface CategoryFilterProps {
  categories: Category[];
  onSetCategory: (categoryName: string) => void;
}

const CategoryFilter = ({ categories, onSetCategory }: CategoryFilterProps) => {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            onClick={() => onSetCategory("all")}
            className="btn btn-all-categories"
          >
            All
          </button>
        </li>
        {categories &&
          categories.map((category) => {
            return (
              <li key={category.name} className="category">
                <button
                  onClick={() => onSetCategory(category.name)}
                  className="btn btn-category"
                  style={{
                    backgroundColor: category.color,
                  }}
                >
                  {category.name}
                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};
export default CategoryFilter;
