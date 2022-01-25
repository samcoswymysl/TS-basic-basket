import Product from './Product';

type BackendLang = 'JavaScript' | 'Java' | 'C#';

type BackendBook = {
  backendLang: BackendLang;
} &Product;

export default BackendBook;
