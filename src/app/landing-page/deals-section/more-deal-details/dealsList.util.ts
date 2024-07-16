interface optionList {
  id: string;
  name: string;
  description: any;
  image: any;
  price:number;
}
export const dealDataArray: optionList[] = [
  {
    id: 'istanbul',
    name: 'Istanbul',
    description:'Istanbul offers a unique blend of East and West, with rich history, stunning architecture, and delicious cuisine. From the iconic Hagia Sophia to the vibrant Grand Bazaar, there is always something to discover in Istanbul.',
    image: '/assets/img/common/deal3.jpg',
    price:33695
  },
  {
    id: 'dubai',
    name: 'Dubai',
    description:'Dubai offers a unique blend of East and West, with rich history, stunning architecture, and delicious cuisine. From the iconic Hagia Sophia to the vibrant Grand Bazaar, there is always something to discover in Istanbul.',
    image: '/assets/img/common/deal4.jpeg',
    price:879526
  },
];
