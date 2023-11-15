class Pizza {
  private slices: number;
  private sauce: boolean;
  private cheese: boolean;
  private toppings: string[] = [];
  private price: number;

  constructor(
    slices: number,
    sauce: boolean,
    cheese: boolean,
    toppings: string[],
    price: number,
  ) {
    this.slices = slices;
    this.sauce = sauce;
    this.cheese = cheese;
    this.toppings = toppings;
    this.price = price;
  }
}

interface PizzaBuilder {
  slices: number;
  sauce: boolean;
  cheese: boolean;
  toppings: string[];
  price: number;

  setSlices(slices: number): PizzaBuilder;
  setSauce(sauce: boolean): PizzaBuilder;
  setCheese(cheese: boolean): PizzaBuilder;
  addTopping(topping: string): PizzaBuilder;
  setPrice(price: number): PizzaBuilder;

  build(): Pizza;
}

class ConcretePizzaBuilder implements PizzaBuilder {
  slices: number;
  sauce: boolean;
  cheese: boolean;
  toppings: string[];
  price: number;

  constructor() {
    this.slices = 0;
    this.sauce = false;
    this.cheese = false;
    this.toppings = [];
    this.price = 0;
  }

  setSlices(slices: number): PizzaBuilder {
    this.slices = slices;
    return this;
  }

  setSauce(sauce: boolean): PizzaBuilder {
    this.sauce = sauce;
    return this;
  }

  setCheese(cheese: boolean): PizzaBuilder {
    this.cheese = cheese;
    return this;
  }

  addTopping(topping: string): PizzaBuilder {
    this.toppings.push(topping);
    return this;
  }

  setPrice(price: number): PizzaBuilder {
    this.price = price;
    return this;
  }

  build(): Pizza {
    const pizza = new Pizza(
      this.slices,
      this.sauce,
      this.cheese,
      this.toppings,
      this.price,
    );
    this.reset();
    return pizza;
  }

  reset(): void {
    this.slices = 0;
    this.sauce = false;
    this.cheese = false;
    this.toppings = [];
    this.price = 0;
    console.log('Pizza builder has been reset.');
  }
}

class PizzaDirector  {
  private pizzaBuilder: PizzaBuilder;

  constructor(
    builder: PizzaBuilder
  ) {
    this.pizzaBuilder = builder;
  }

  setPizzaBuilder(builder: PizzaBuilder): void {
    this.pizzaBuilder = builder;
  }

  makeHawaiiana(): Pizza {
    return this.pizzaBuilder.setCheese(true)
                            .setSauce(true)
                            .setSlices(8)
                            .addTopping('pineapple')
                            .addTopping('ham')
                            .setPrice(10)
                            .build();
  }

  makeCheese(): Pizza {
    return this.pizzaBuilder.setCheese(true)
                            .setSauce(true)
                            .setSlices(8)
                            .setPrice(10)
                            .build();
  }

  makeHam(): Pizza {
    return this.pizzaBuilder.setCheese(true)
                            .setSauce(true)
                            .setSlices(8)
                            .addTopping('ham')
                            .setPrice(10)
                            .build();
  }
}

const pizzaBuilder = new ConcretePizzaBuilder();

const hawaiiana = pizzaBuilder.setCheese(true)
                              .setSauce(true)
                              .setSlices(8)
                              .addTopping('pineapple')
                              .addTopping('ham')
                              .setPrice(10)
                              .build();
console.log(hawaiiana);

const director = new PizzaDirector(pizzaBuilder);

const cheese = director.makeCheese();
console.log(cheese);