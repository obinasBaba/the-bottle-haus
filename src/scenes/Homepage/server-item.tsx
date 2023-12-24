import clsx from 'clsx';


const MyComponent = async () => {
  // const collections = await getCollections();

  // fech fake json data
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();

  // wait 3s
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <div className={clsx(['one'])}>{data.title}</div>;
};

export default MyComponent;
