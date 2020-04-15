import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import BookmarksPage from './pages/BookmarksPage'
import EditBookmarkPage from './pages/EditBookmarkPage'

const App = () => {
    return (
        <Router>
            <header className="text-center">
                <h1>Bookmarks</h1>
            </header>
            <main>
                <Switch>
                    <Route key="landing" exact path="/">
                        <BookmarksPage />
                    </Route>
                    <Route key="page-request" exact path="/:page">
                        <BookmarksPage />
                    </Route>
                    <Route path="/edit/:id">
                        <EditBookmarkPage />
                    </Route>
                    <Route path="*">
                        <div className="container">
                            <h1>Nothing to bookmark here!</h1>
                            <Link to="/">==>> Back to bookmarking &lt;&lt;==</Link>
                        </div>
                    </Route>
                </Switch>
            </main>
            <ToastContainer />
        </Router>
    )
}

export default App
