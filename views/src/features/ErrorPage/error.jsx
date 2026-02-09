import { useRouteError, Link } from "react-router"

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error)

  return (
    <div id="error-page">
      <h3>Oops!!</h3>
      <p>Something unexpected has occurred.</p>
      <p><strong>Error: </strong>{error.name}</p>
      <p><strong>Error message: </strong>{error.message}</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}