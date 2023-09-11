import GetCountries from './components/GetCountries';
import Search from './components/Search';

function App() {

  return (
    <>
      <div className='container my-4'>
        <div className="row">
          <div className="col-6 offset-3">
            <h1 className='text-center text-primary fw-semibold'>Filtered Countries</h1>
          </div>
        </div>
        <Search/>
      </div>
    </>
  )
}

export default App
