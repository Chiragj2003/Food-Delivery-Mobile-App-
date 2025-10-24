import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const MENU_KEY = '@fastfood_menu';
const CATEGORIES_KEY = '@fastfood_categories';

// Mock data for menu items
const MOCK_MENU_ITEMS = [
  {
    $id: '1',
    name: 'Classic Burger',
    price: 8.99,
    rating: 4.5,
    image: require('@/assets/images/burger-one.png'),
    category: 'burgers',
    description: 'Juicy beef patty with fresh lettuce, tomato, and our special sauce',
  },
  {
    $id: '2',
    name: 'Cheese Burger',
    price: 9.99,
    rating: 4.7,
    image: require('@/assets/images/burger-two.png'),
    category: 'burgers',
    description: 'Double cheese delight with premium beef',
  },
  {
    $id: '3',
    name: 'Pepperoni Pizza',
    price: 12.99,
    rating: 4.8,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Classic pizza with pepperoni and mozzarella cheese',
  },
  {
    $id: '4',
    name: 'French Fries',
    price: 3.99,
    rating: 4.3,
    image: require('@/assets/images/fries.png'),
    category: 'sides',
    description: 'Crispy golden fries with a perfect crunch',
  },
  {
    $id: '5',
    name: 'Chicken Burrito',
    price: 10.99,
    rating: 4.6,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Wrapped with grilled chicken, rice, beans, and salsa',
  },
  {
    $id: '6',
    name: 'Fresh Salad',
    price: 6.99,
    rating: 4.4,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Garden fresh vegetables with vinaigrette dressing',
  },
  {
    $id: '7',
    name: 'Mozzarella Sticks',
    price: 5.99,
    rating: 4.5,
    image: require('@/assets/images/mozarella-sticks.png'),
    category: 'sides',
    description: 'Crispy breaded mozzarella with marinara sauce',
  },
  {
    $id: '8',
    name: 'Onion Rings',
    price: 4.99,
    rating: 4.2,
    image: require('@/assets/images/onion-rings.png'),
    category: 'sides',
    description: 'Beer-battered crispy onion rings',
  },
];

const MOCK_CATEGORIES = [
  { $id: '1', name: 'All', description: 'All items' },
  { $id: '2', name: 'Burgers', description: 'Delicious burgers' },
  { $id: '3', name: 'Pizza', description: 'Italian pizzas' },
  { $id: '4', name: 'Mexican', description: 'Mexican cuisine' },
  { $id: '5', name: 'Sides', description: 'Side dishes' },
  { $id: '6', name: 'Healthy', description: 'Healthy options' },
];

// Initialize database with mock data
export const initializeDatabase = async (): Promise<void> => {
  try {
    const existingMenu = await AsyncStorage.getItem(MENU_KEY);
    if (!existingMenu) {
      await AsyncStorage.setItem(MENU_KEY, JSON.stringify(MOCK_MENU_ITEMS));
    }

    const existingCategories = await AsyncStorage.getItem(CATEGORIES_KEY);
    if (!existingCategories) {
      await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(MOCK_CATEGORIES));
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};

// Get all menu items with optional filters
export const getMenu = async (params?: {
  category?: string;
  query?: string;
  limit?: number;
}): Promise<any[]> => {
  try {
    const menuData = await AsyncStorage.getItem(MENU_KEY);
    let items = menuData ? JSON.parse(menuData) : MOCK_MENU_ITEMS;

    // Filter by category
    if (params?.category && params.category !== 'all') {
      items = items.filter((item: any) => 
        item.category.toLowerCase() === params.category?.toLowerCase()
      );
    }

    // Filter by search query
    if (params?.query) {
      const query = params.query.toLowerCase();
      items = items.filter((item: any) => 
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }

    // Apply limit
    if (params?.limit) {
      items = items.slice(0, params.limit);
    }

    return items;
  } catch (error) {
    console.error('Failed to get menu:', error);
    return MOCK_MENU_ITEMS;
  }
};

// Get all categories
export const getCategories = async (): Promise<any[]> => {
  try {
    const categoriesData = await AsyncStorage.getItem(CATEGORIES_KEY);
    return categoriesData ? JSON.parse(categoriesData) : MOCK_CATEGORIES;
  } catch (error) {
    console.error('Failed to get categories:', error);
    return MOCK_CATEGORIES;
  }
};

// Get featured items (top rated)
export const getFeaturedMenu = async (limit: number = 4): Promise<any[]> => {
  try {
    const menuData = await AsyncStorage.getItem(MENU_KEY);
    const items = menuData ? JSON.parse(menuData) : MOCK_MENU_ITEMS;
    
    // Sort by rating and return top items
    const featured = items
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, limit);
    
    return featured;
  } catch (error) {
    console.error('Failed to get featured menu:', error);
    return MOCK_MENU_ITEMS.slice(0, limit);
  }
};

// Seed database (reset to default data)
export const seed = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(MENU_KEY, JSON.stringify(MOCK_MENU_ITEMS));
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(MOCK_CATEGORIES));
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Failed to seed database:', error);
    throw error;
  }
};
