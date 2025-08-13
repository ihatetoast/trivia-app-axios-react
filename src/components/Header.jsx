// unnecessary Component, but i love me a header comp 

export default function Header({title, children}) {
  return <header><h1>{title}</h1>{children}</header>;
}
