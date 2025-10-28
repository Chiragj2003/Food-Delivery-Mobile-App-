import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const MENU_KEY = '@fastfood_menu';
const CATEGORIES_KEY = '@fastfood_categories';

// Mock data for menu items
const MOCK_MENU_ITEMS = [
  {
    $id: 'classic-burger',
    name: 'Classic Burger',
    price: 8.99,
    rating: 4.5,
    image: require('@/assets/images/burger-one.png'),
    category: 'burgers',
    description: 'Juicy beef patty with fresh lettuce, tomato, and our special sauce',
    isNew: false,
  },
  {
    $id: 'cheese-burst-burger',
    name: 'Cheese Burst Burger',
    price: 10.49,
    rating: 4.7,
    image: require('@/assets/images/burger-two.png'),
    category: 'burgers',
    description: 'Overloaded cheddar and smoked gouda melted over a double patty',
    isNew: true,
  },
  {
    $id: 'bbq-bacon-burger',
    name: 'BBQ Bacon Burger',
    price: 11.99,
    rating: 4.8,
    image: require('@/assets/images/burger-one.png'),
    category: 'burgers',
    description: 'Smoky BBQ sauce with crispy bacon and caramelized onions',
    isNew: false,
  },
  {
    $id: 'mushroom-swiss-burger',
    name: 'Mushroom Swiss Burger',
    price: 10.99,
    rating: 4.6,
    image: require('@/assets/images/burger-two.png'),
    category: 'burgers',
    description: 'Sautéed mushrooms and melted Swiss cheese on a juicy patty',
    isNew: false,
  },
  {
    $id: 'spicy-jalapeno-burger',
    name: 'Spicy Jalapeño Burger',
    price: 9.99,
    rating: 4.7,
    image: require('@/assets/images/burger-one.png'),
    category: 'burgers',
    description: 'Fire-roasted jalapeños with pepper jack cheese and chipotle mayo',
    isNew: true,
  },
  {
    $id: 'veggie-burger',
    name: 'Veggie Delight Burger',
    price: 8.49,
    rating: 4.4,
    image: require('@/assets/images/burger-two.png'),
    category: 'burgers',
    description: 'Plant-based patty with avocado, sprouts, and herb mayo',
    isNew: false,
  },
  {
    $id: 'double-stack-burger',
    name: 'Double Stack Burger',
    price: 13.99,
    rating: 4.9,
    image: require('@/assets/images/burger-one.png'),
    category: 'burgers',
    description: 'Two beef patties stacked with double cheese and special sauce',
    isNew: true,
  },
  {
    $id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    price: 12.99,
    rating: 4.8,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Classic pizza with pepperoni and mozzarella cheese',
    isNew: false,
  },
  {
    $id: 'spicy-veggie-pizza',
    name: 'Spicy Veggie Pizza',
    price: 11.49,
    rating: 4.6,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Loaded with jalapeños, roasted peppers, and creamy ricotta',
    isNew: true,
  },
  {
    $id: 'margherita-pizza',
    name: 'Margherita Pizza',
    price: 10.99,
    rating: 4.7,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Fresh mozzarella, tomatoes, and basil on a thin crust',
    isNew: false,
  },
  {
    $id: 'meat-lovers-pizza',
    name: 'Meat Lovers Pizza',
    price: 14.99,
    rating: 4.9,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Loaded with pepperoni, sausage, bacon, and ham',
    isNew: false,
  },
  {
    $id: 'hawaiian-pizza',
    name: 'Hawaiian Pizza',
    price: 12.49,
    rating: 4.4,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Ham and pineapple with mozzarella cheese',
    isNew: false,
  },
  {
    $id: 'bbq-chicken-pizza',
    name: 'BBQ Chicken Pizza',
    price: 13.49,
    rating: 4.7,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Grilled chicken with BBQ sauce, red onions, and cilantro',
    isNew: true,
  },
  {
    $id: 'four-cheese-pizza',
    name: 'Four Cheese Pizza',
    price: 13.99,
    rating: 4.8,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Mozzarella, parmesan, gouda, and blue cheese blend',
    isNew: false,
  },
  {
    $id: 'street-fries',
    name: 'Street Cart Fries',
    price: 4.25,
    rating: 4.4,
    image: require('@/assets/images/fries.png'),
    category: 'sides',
    description: 'Crispy russets tossed in garlic salt and parsley',
    isNew: false,
  },
  {
    $id: 'truffle-fries',
    name: 'Black Truffle Fries',
    price: 5.75,
    rating: 4.9,
    image: require('@/assets/images/fries.png'),
    category: 'sides',
    description: 'Hand-cut potatoes finished with truffle oil and parmesan snow',
    isNew: true,
  },
  {
    $id: 'loaded-fries',
    name: 'Loaded Cheese Fries',
    price: 6.49,
    rating: 4.7,
    image: require('@/assets/images/fries.png'),
    category: 'sides',
    description: 'Crispy fries topped with melted cheese, bacon, and green onions',
    isNew: true,
  },
  {
    $id: 'sweet-potato-fries',
    name: 'Sweet Potato Fries',
    price: 5.25,
    rating: 4.5,
    image: require('@/assets/images/fries.png'),
    category: 'sides',
    description: 'Golden sweet potato fries with honey dipping sauce',
    isNew: false,
  },
  {
    $id: 'fire-roasted-burrito',
    name: 'Fire Roasted Burrito',
    price: 10.99,
    rating: 4.6,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Smoky chipotle chicken wrapped with rice, beans, and corn salsa',
    isNew: false,
  },
  {
    $id: 'steak-burrito',
    name: 'Steak Burrito',
    price: 12.99,
    rating: 4.8,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Grilled steak with black beans, cilantro rice, and pico de gallo',
    isNew: true,
  },
  {
    $id: 'carnitas-burrito',
    name: 'Carnitas Burrito',
    price: 11.99,
    rating: 4.7,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Slow-cooked pork with refried beans, cheese, and salsa verde',
    isNew: false,
  },
  {
    $id: 'shrimp-tacos',
    name: 'Baja Shrimp Tacos',
    price: 13.49,
    rating: 4.8,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Grilled shrimp tacos with cabbage slaw and chipotle crema',
    isNew: true,
  },
  {
    $id: 'chicken-quesadilla',
    name: 'Chicken Quesadilla',
    price: 9.99,
    rating: 4.6,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Grilled chicken with melted cheese in a crispy tortilla',
    isNew: false,
  },
  {
    $id: 'veggie-burrito-bowl',
    name: 'Veggie Burrito Bowl',
    price: 9.75,
    rating: 4.3,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Roasted vegetables, quinoa, and avocado crema in a bowl',
    isNew: true,
  },
  {
    $id: 'crispy-mozzarella',
    name: 'Crispy Mozzarella',
    price: 5.99,
    rating: 4.5,
    image: require('@/assets/images/mozarella-sticks.png'),
    category: 'sides',
    description: 'Breadcrumb-coated mozzarella with blistered tomato dip',
    isNew: false,
  },
  {
    $id: 'golden-onion-rings',
    name: 'Golden Onion Rings',
    price: 4.99,
    rating: 4.2,
    image: require('@/assets/images/onion-rings.png'),
    category: 'sides',
    description: 'Beer-battered onions with sweet chili glaze',
    isNew: false,
  },
  {
    $id: 'buffalo-wings',
    name: 'Buffalo Wings',
    price: 8.99,
    rating: 4.6,
    image: require('@/assets/images/onion-rings.png'),
    category: 'sides',
    description: 'Crispy chicken wings tossed in spicy buffalo sauce',
    isNew: false,
  },
  {
    $id: 'chicken-tenders',
    name: 'Chicken Tenders',
    price: 7.99,
    rating: 4.5,
    image: require('@/assets/images/mozarella-sticks.png'),
    category: 'sides',
    description: 'Golden fried chicken tenders with honey mustard',
    isNew: false,
  },
  {
    $id: 'citrus-salad',
    name: 'Citrus Crunch Salad',
    price: 7.25,
    rating: 4.4,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Mixed greens, candied pecans, and citrus vinaigrette',
    isNew: true,
  },
  {
    $id: 'caesar-salad',
    name: 'Caesar Salad',
    price: 6.99,
    rating: 4.5,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Romaine lettuce, parmesan, croutons, and Caesar dressing',
    isNew: false,
  },
  {
    $id: 'greek-salad',
    name: 'Greek Salad',
    price: 7.99,
    rating: 4.6,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Tomatoes, cucumbers, olives, feta cheese, and olive oil',
    isNew: false,
  },
  {
    $id: 'protein-bowl',
    name: 'Protein Power Bowl',
    price: 10.99,
    rating: 4.7,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Grilled chicken, quinoa, kale, and tahini dressing',
    isNew: true,
  },
  {
    $id: 'salted-caramel-shake',
    name: 'Salted Caramel Shake',
    price: 4.5,
    rating: 4.8,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Creamy caramel shake finished with sea salt flakes',
    isNew: true,
  },
  {
    $id: 'chocolate-shake',
    name: 'Chocolate Shake',
    price: 4.25,
    rating: 4.7,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Rich chocolate shake with whipped cream',
    isNew: false,
  },
  {
    $id: 'vanilla-shake',
    name: 'Vanilla Shake',
    price: 4.0,
    rating: 4.6,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Classic vanilla shake made with real vanilla beans',
    isNew: false,
  },
  {
    $id: 'strawberry-shake',
    name: 'Strawberry Shake',
    price: 4.25,
    rating: 4.7,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Fresh strawberry shake with whipped cream topping',
    isNew: false,
  },
  {
    $id: 'mango-smoothie',
    name: 'Tropical Mango Smoothie',
    price: 5.5,
    rating: 4.8,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Refreshing mango smoothie with coconut and banana',
    isNew: true,
  },
  // Additional Burgers
  {
    $id: 'crispy-chicken-burger',
    name: 'Crispy Chicken Burger',
    price: 9.49,
    rating: 4.6,
    image: require('@/assets/images/burger-two.png'),
    category: 'burgers',
    description: 'Crispy fried chicken with lettuce, pickles, and ranch dressing',
    isNew: false,
  },
  {
    $id: 'bacon-avocado-burger',
    name: 'Bacon Avocado Burger',
    price: 12.49,
    rating: 4.8,
    image: require('@/assets/images/burger-one.png'),
    category: 'burgers',
    description: 'Premium beef patty with crispy bacon and fresh avocado',
    isNew: true,
  },
  {
    $id: 'teriyaki-burger',
    name: 'Teriyaki Glazed Burger',
    price: 10.79,
    rating: 4.5,
    image: require('@/assets/images/burger-two.png'),
    category: 'burgers',
    description: 'Glazed patty with grilled pineapple and teriyaki sauce',
    isNew: true,
  },
  // Additional Pizza
  {
    $id: 'buffalo-chicken-pizza',
    name: 'Buffalo Chicken Pizza',
    price: 13.99,
    rating: 4.6,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Spicy buffalo chicken with ranch drizzle and mozzarella',
    isNew: true,
  },
  {
    $id: 'supreme-pizza',
    name: 'Supreme Pizza',
    price: 15.49,
    rating: 4.8,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Loaded with pepperoni, sausage, peppers, onions, and mushrooms',
    isNew: false,
  },
  {
    $id: 'white-pizza',
    name: 'White Garlic Pizza',
    price: 11.99,
    rating: 4.7,
    image: require('@/assets/images/pizza-one.png'),
    category: 'pizza',
    description: 'Ricotta and mozzarella with roasted garlic and herbs',
    isNew: false,
  },
  // Additional Mexican
  {
    $id: 'fish-tacos',
    name: 'Crispy Fish Tacos',
    price: 12.49,
    rating: 4.7,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Beer-battered fish with lime crema and cabbage slaw',
    isNew: false,
  },
  {
    $id: 'carne-asada-burrito',
    name: 'Carne Asada Burrito',
    price: 13.49,
    rating: 4.9,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Grilled marinated steak with guacamole and pico de gallo',
    isNew: true,
  },
  {
    $id: 'veggie-tacos',
    name: 'Roasted Veggie Tacos',
    price: 8.99,
    rating: 4.4,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Grilled vegetables with black beans and avocado',
    isNew: false,
  },
  {
    $id: 'nachos-supreme',
    name: 'Nachos Supreme',
    price: 9.99,
    rating: 4.6,
    image: require('@/assets/images/buritto.png'),
    category: 'mexican',
    description: 'Loaded nachos with cheese, jalapeños, guacamole, and sour cream',
    isNew: true,
  },
  // Additional Sides
  {
    $id: 'mac-and-cheese',
    name: 'Creamy Mac & Cheese',
    price: 5.49,
    rating: 4.7,
    image: require('@/assets/images/cheese.png'),
    category: 'sides',
    description: 'Classic macaroni with three-cheese blend',
    isNew: false,
  },
  {
    $id: 'coleslaw-side',
    name: 'Tangy Coleslaw',
    price: 3.49,
    rating: 4.3,
    image: require('@/assets/images/coleslaw.png'),
    category: 'sides',
    description: 'Fresh cabbage slaw with tangy vinaigrette',
    isNew: false,
  },
  {
    $id: 'garlic-bread',
    name: 'Garlic Bread',
    price: 4.49,
    rating: 4.5,
    image: require('@/assets/images/cheese.png'),
    category: 'sides',
    description: 'Toasted bread with garlic butter and parsley',
    isNew: false,
  },
  {
    $id: 'jalapeno-poppers',
    name: 'Jalapeño Poppers',
    price: 6.99,
    rating: 4.6,
    image: require('@/assets/images/mozarella-sticks.png'),
    category: 'sides',
    description: 'Cream cheese stuffed jalapeños, breaded and fried',
    isNew: true,
  },
  // Additional Healthy Options
  {
    $id: 'kale-superfood-salad',
    name: 'Kale Superfood Salad',
    price: 9.49,
    rating: 4.6,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Kale, quinoa, cranberries, almonds with lemon vinaigrette',
    isNew: true,
  },
  {
    $id: 'grilled-chicken-salad',
    name: 'Grilled Chicken Salad',
    price: 10.49,
    rating: 4.7,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Grilled chicken breast over mixed greens with balsamic',
    isNew: false,
  },
  {
    $id: 'asian-sesame-salad',
    name: 'Asian Sesame Salad',
    price: 8.99,
    rating: 4.5,
    image: require('@/assets/images/salad.png'),
    category: 'healthy',
    description: 'Mixed greens with edamame, mandarin oranges, and sesame dressing',
    isNew: false,
  },
  {
    $id: 'avocado-toast-bowl',
    name: 'Avocado Toast Bowl',
    price: 8.49,
    rating: 4.4,
    image: require('@/assets/images/avocado.png'),
    category: 'healthy',
    description: 'Smashed avocado, cherry tomatoes, and poached egg over greens',
    isNew: true,
  },
  // Additional Drinks
  {
    $id: 'oreo-shake',
    name: 'Oreo Cookie Shake',
    price: 5.25,
    rating: 4.9,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Vanilla shake blended with Oreo cookies',
    isNew: true,
  },
  {
    $id: 'peanut-butter-shake',
    name: 'Peanut Butter Shake',
    price: 5.49,
    rating: 4.7,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Creamy peanut butter shake with chocolate drizzle',
    isNew: false,
  },
  {
    $id: 'berry-blast-smoothie',
    name: 'Berry Blast Smoothie',
    price: 5.75,
    rating: 4.8,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Mixed berries with yogurt and honey',
    isNew: true,
  },
  {
    $id: 'green-detox-smoothie',
    name: 'Green Detox Smoothie',
    price: 6.25,
    rating: 4.5,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Spinach, kale, apple, and ginger energizer',
    isNew: false,
  },
  {
    $id: 'iced-coffee',
    name: 'Cold Brew Coffee',
    price: 3.99,
    rating: 4.6,
    image: require('@/assets/images/success.png'),
    category: 'drinks',
    description: 'Smooth cold brew coffee served over ice',
    isNew: false,
  },
];

const MOCK_CATEGORIES = [
  { $id: 'burgers', name: 'Burgers', description: 'Stacked patties and brioche buns' },
  { $id: 'pizza', name: 'Pizza', description: 'Stone-fired pies and slices' },
  { $id: 'mexican', name: 'Mexican', description: 'Wraps, bowls, and street favorites' },
  { $id: 'sides', name: 'Sides', description: 'Shareable sides and add-ons' },
  { $id: 'healthy', name: 'Healthy', description: 'Greens and light bites' },
  { $id: 'drinks', name: 'Drinks', description: 'Shakes and sips' },
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
    
    const highlighted = items
      .filter((item: any) => item.isNew)
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, limit);

    if (highlighted.length >= limit) {
      return highlighted;
    }

    const fallback = items
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, limit);

    return highlighted.concat(
      fallback.filter((item: any) => !highlighted.find((entry: any) => entry.$id === item.$id))
    ).slice(0, limit);
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
