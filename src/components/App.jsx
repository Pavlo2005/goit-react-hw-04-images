import { useEffect, useState } from 'react';
import { fetchImeges } from 'api';
import { Bars } from 'react-loader-spinner';
import { ImegeGallery } from './ImegeGallery/ImegeGallery';
import { AddButton } from './AddButton/AddButton';
import { Layout } from './Layout';
import { SearchForm } from './SearchForm/SearchForm';
import { ErrorMessage } from './ErrorMessage';

export const App = () => {
  const [imeges, setImeges] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [add, setAdd] = useState(true);
  const [page,setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getQuizzes() {
      try {
        setPage(1);
        setLoader(true);
        setError(false);
  
        const newImeges = await fetchImeges(1);
  
        if (12 >= newImeges.totalHits) {
          setAdd(false);
        }

        setImeges([...newImeges.hits]);
        setPage(2);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    getQuizzes();
  },[])
  
  const changeSearch = async value => {
    if (value !== search) {
      try {
        setSearch(value);
        setPage(1);
        setLoader(true);
        setError(false);

        const newImeges = await fetchImeges(value, 1);

        if (12 >= newImeges.totalHits) {
          setAdd(false);
        } else {
          setAdd(true);
        }

        setImeges([...newImeges.hits]);
        setPage(2);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
  }

  const addImeges = async () => {
    try {
      setLoader(true);
      setError(false);

      const newImeges = await fetchImeges(search, page);

      if (page * 12 >= newImeges.totalHits) {
        setAdd(false);
      }

      setImeges(prevState => (
        [...prevState, ...newImeges.hits]
      ));
      setPage(page+1);
    } catch (error) {
      setError(true);
    } finally {
      setLoader(false);
    }
  }

  return (
    <Layout>
      <SearchForm onChangeSerch={changeSearch}></SearchForm>
      {imeges.length > 0 && (
        <ImegeGallery imeges={imeges}></ImegeGallery>)}
      {loader && (
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          visible={true}
        />)}
      {error && (
        <ErrorMessage> Whoops! Error! Please reload this page!</ErrorMessage>
      )
      }
      {!(loader || imeges.length === 0 || !add) && (
        <AddButton onAddImeges={addImeges}></AddButton>
      )
      }
      {(imeges.length === 0 || !add) && (
        <div> This is the last page</div>
      )
      }
    </Layout >
  );
}
