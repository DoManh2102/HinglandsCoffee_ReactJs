import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClientLayout from './components/Layout/ClientLayout/ClientLayout';
import { publicRouter } from './router/router';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRouter.map((router, index) => {
            let Layout = ClientLayout
            if (router.layout) {
              Layout = router.layout
            } else if (router.layout === null) {
              Layout = Fragment
            }
            const Page = router.component
            return <Route key={index} path={router.path} element={
              <Layout>
                <Page />
              </Layout>} />
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
