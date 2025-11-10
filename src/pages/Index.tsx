import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Ожидание чуда",
    author: "Анна Волкова",
    price: 890,
    category: "Беременность",
    description: "Полное руководство по беременности и подготовке к родам. Всё, что нужно знать будущей маме.",
    image: "https://cdn.poehali.dev/projects/613cad22-1f35-4cb6-9f3d-7cd622818a94/files/eda25d8b-58c8-4c62-8af2-9d4e6ca608b9.jpg"
  },
  {
    id: 2,
    title: "Первый год жизни",
    author: "Ольга Петрова",
    price: 750,
    category: "Младенчество",
    description: "Практические советы по уходу за новорожденным, кормлению и развитию малыша.",
    image: "https://cdn.poehali.dev/projects/613cad22-1f35-4cb6-9f3d-7cd622818a94/files/eda25d8b-58c8-4c62-8af2-9d4e6ca608b9.jpg"
  },
  {
    id: 3,
    title: "Растим гения",
    author: "Мария Иванова",
    price: 680,
    category: "Детство",
    description: "Методики раннего развития, игры и занятия для детей от 1 до 7 лет.",
    image: "https://cdn.poehali.dev/projects/613cad22-1f35-4cb6-9f3d-7cd622818a94/files/eda25d8b-58c8-4c62-8af2-9d4e6ca608b9.jpg"
  },
  {
    id: 4,
    title: "Подростки: инструкция",
    author: "Елена Смирнова",
    price: 820,
    category: "Подростки",
    description: "Как наладить контакт с подростком и пережить переходный возраст без конфликтов.",
    image: "https://cdn.poehali.dev/projects/613cad22-1f35-4cb6-9f3d-7cd622818a94/files/cadad377-9916-4c42-9aac-327a3db06770.jpg"
  },
  {
    id: 5,
    title: "Взрослые дети",
    author: "Наталья Королёва",
    price: 790,
    category: "Взрослые дети",
    description: "Психология отношений с выросшими детьми. Как оставаться близкими на расстоянии.",
    image: "https://cdn.poehali.dev/projects/613cad22-1f35-4cb6-9f3d-7cd622818a94/files/d9180947-c6fb-4b76-948d-28b2b55a281f.jpg"
  },
  {
    id: 6,
    title: "Бабушка и дедушка",
    author: "Татьяна Лебедева",
    price: 690,
    category: "Взрослые дети",
    description: "Роль бабушек и дедушек в жизни внуков. Как передать опыт следующему поколению.",
    image: "https://cdn.poehali.dev/projects/613cad22-1f35-4cb6-9f3d-7cd622818a94/files/d9180947-c6fb-4b76-948d-28b2b55a281f.jpg"
  }
];

const categories = ["Все книги", "Беременность", "Младенчество", "Детство", "Подростки", "Взрослые дети"];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("Все книги");
  const [cart, setCart] = useState<Book[]>([]);

  const filteredBooks = selectedCategory === "Все книги" 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  const addToCart = (book: Book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId: number) => {
    const index = cart.findIndex(item => item.id === bookId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const totalPrice = cart.reduce((sum, book) => sum + book.price, 0);

  const getItemCount = (bookId: number) => {
    return cart.filter(item => item.id === bookId).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="BookHeart" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Мама
            </h1>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? "Ваша корзина пуста" : `Книг в корзине: ${cart.length}`}
                </SheetDescription>
              </SheetHeader>
              
              {cart.length > 0 && (
                <div className="mt-6 space-y-4">
                  {Array.from(new Set(cart.map(book => book.id))).map(bookId => {
                    const book = books.find(b => b.id === bookId)!;
                    const count = getItemCount(bookId);
                    return (
                      <div key={bookId} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                        <img src={book.image} alt={book.title} className="w-16 h-20 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{book.title}</p>
                          <p className="text-sm text-muted-foreground">{book.price} ₽ × {count}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(bookId)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    );
                  })}
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Итого:</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        <section className="py-16 px-4 md:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="container max-w-5xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge className="mb-4" variant="secondary">
              Книжный магазин
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              От первых дней <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                до мудрости лет
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Лучшие книги о материнстве на каждом этапе жизни. 
              Практические советы, научный подход и честные истории.
            </p>
            <div className="flex gap-3 justify-center flex-wrap pt-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline">
                О проекте
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredBooks.map((book, index) => (
                <Card 
                  key={book.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in border-2 hover:border-primary/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl leading-tight">{book.title}</CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        {book.category}
                      </Badge>
                    </div>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {book.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {book.price} ₽
                    </span>
                    <Button 
                      onClick={() => addToCart(book)}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      <Icon name="ShoppingBag" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold">
              Почему выбирают нас?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3 p-6 rounded-2xl bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto">
                  <Icon name="Award" size={28} className="text-white" />
                </div>
                <h4 className="font-bold text-lg">Экспертный подбор</h4>
                <p className="text-sm text-muted-foreground">
                  Только проверенные авторы и научно обоснованные методики
                </p>
              </div>
              
              <div className="space-y-3 p-6 rounded-2xl bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto">
                  <Icon name="Truck" size={28} className="text-white" />
                </div>
                <h4 className="font-bold text-lg">Быстрая доставка</h4>
                <p className="text-sm text-muted-foreground">
                  Доставим в любую точку России за 2-5 дней
                </p>
              </div>
              
              <div className="space-y-3 p-6 rounded-2xl bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto">
                  <Icon name="Gift" size={28} className="text-white" />
                </div>
                <h4 className="font-bold text-lg">Подарочная упаковка</h4>
                <p className="text-sm text-muted-foreground">
                  Красивая упаковка бесплатно к каждому заказу
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="container max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Мама. Книги о материнстве на каждом этапе жизни</p>
        </div>
      </footer>
    </div>
  );
}
