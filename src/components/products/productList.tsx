import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { findProductsByTitle, getProducts, removeAll } from 'api/products';
import IProductData from 'types/IProduct';
import cart from '../../assets/icons/cart.png'
const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Array<IProductData>>([]);
    const [currentProduct, setCurrentProduct] = useState<IProductData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [paginationCount, setPaginationCount] = useState<number>(0);
    const [limit, setLimit] = useState<number>(3);
    const [totalPages, setTotalPages] = useState<Array<number>>([]);
    const allProducts = useRef<Array<IProductData>>([]);
    const [filtertext, setMessage] = useState('');
    const [count, setcount] = useState(0);
    const [cartcount, setcartCount] = useState(0);
    let selectvalue = useRef("Price");
    let cartCount = useRef(0);

    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const getPaginatedProducts = (page: number) => {
        setProducts(allProducts.current.slice((page - 1) * limit, page * limit));
    }

    const retrieveProducts = async () => {
        try {
            const response = await getProducts();
            allProducts.current = response.data;
            setPaginationCount(response.data.length)
            setcount(response.data.length)

            setPagination(response.data.length, limit)
            getPaginatedProducts(1);
        } catch (e) {
            console.log(e);
        }
    };

    const refreshList = () => {
        retrieveProducts();
        setCurrentProduct(null);
        setCurrentIndex(-1);
    };
    const setActiveProduct = (Product: IProductData, index: number) => {
        setCurrentProduct(Product);
        setCurrentIndex(index);
    };
    const removeAllProducts = () => {
        removeAll()
            .then((response: any) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    const findByTitle = () => {
        findProductsByTitle(searchTitle)
            .then((response: any) => {
                setProducts(response.data);
                setCurrentProduct(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    const setPagination = (totalCount: number, limit: number) => {
        var pages = Math.ceil(totalCount / limit);
        var pagesArray = [];
        for (var i = 1; i <= pages; i++) {
            pagesArray.push(i);
        }
        setTotalPages(pagesArray);
    }
    const handleChange = (event: any) => {
        let filterval = event.target.value
        setMessage(filterval);
        if (filterval != "") {
            let products = allProducts.current.filter(p => p.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
            setProducts(products);
            setcount(products.length)
        }
        else {
            getPaginatedProducts(1)
            setcount(allProducts.current.length)
        }
    };
    const handleSelect = (e: any) => {
        console.log(e.target.value);
        selectvalue.current = e.target.value;
    }
    const getSortedProducts = (order: number) => {

        let key: any = selectvalue.current;
        let sortedarray:Array<IProductData> = [];
        
        if (key == "Price" && order == 1) {
            sortedarray = allProducts.current.sort((a, b) => parseFloat(a.price) - parseFloat(b.price) )
        }
        else if(key == "Price" && order == 2){
            sortedarray = allProducts.current.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
            
        }
        else if(key == "Title" && order == 1){
            sortedarray = allProducts.current.sort((a, b) => a.title.localeCompare(b.title))
        }
        else if(key == "Title" && order == 2){
            sortedarray = allProducts.current.sort((a, b) => b.title.localeCompare(a.title))
        }
        setProducts(sortedarray)
       // allProducts.current = sortedarray;
        getPaginatedProducts(1)


    }

    const updateCartCount = () => {
        cartCount.current =  cartCount.current  + 1 ;
        setcartCount(cartCount.current)
    }
    useEffect(() => {
        retrieveProducts();
    }, []);

    return (
        <div className="container">
            <div className="row">
               
                <main className="col-md-12">
                    <header className="border-bottom mb-4 pb-3">
                        <div className="form-inline">
                            <span className="mr-md-auto">{count} Items found </span>
                            <span>Sort By:</span>
                            <select className="mr-2 form-control" onChange={handleSelect}>
                                <option>Price</option>
                                <option>Title</option>
                            </select>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => getSortedProducts(1)}>Asc</button>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => getSortedProducts(2)}>Desc</button>
                            <span><img src={cart} className="fa fa-bars" />{cartcount} </span>
                            {/* <div className="btn-group">
                                <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" data-original-title="List view" >
                                    <i className="fa fa-bars" /></a>
                                <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" data-original-title="Grid view">
                                    <i className="fa fa-th" /></a>
                            </div> */}
                        </div>
                    </header>{/* sect-heading */}
                    <input
                        type="text"
                        id="message"
                        name="message"
                        onChange={handleChange}
                        value={filtertext}
                    />
                    <div className="row">

                        {products.map((data, i: number) => (
                            <div className="col-md-4" key={i}>
                                <figure className="card card-product-grid">
                                    <div className="img-wrap">
                                        <img src={data.image} className="img-fluid" />
                                        {/* <a className="btn-overlay" href="#"><i className="fa fa-search-plus" /> Quick view</a> */}
                                    </div> {/* img-wrap.// */}
                                    <figcaption className="info-wrap">
                                        <div className="fix-height">
                                            <a href="#" className="title">{data.title}</a>
                                            <div className="price-wrap mt-2">
                                                <span className="price">{data.price}</span>

                                            </div> {/* price-wrap.// */}
                                        </div>
                                        <button className="btn btn-block btn-primary" onClick={() => updateCartCount()}>Add To Cart</button>
                                        {/* <a href="#" className="btn btn-block btn-primary">Add to cart </a> */}
                                    </figcaption>
                                </figure>

                            </div>
                        ))}
                    </div> {/* row end.// */}
                    {/* <h3>Pagination Count : { paginationCount }</h3>
                    <h3>Limit : {limit}</h3> */}

                    <nav className="mt-4" aria-label="Page navigation sample">
                        <ul className="pagination">
                            {totalPages.map((p, i: number) => (
                                // <li>{p}</li>
                                <li key={i} className="page-item active" onClick={() => getPaginatedProducts(p)}>
                                    <a className="page-link" href="#">{p}</a>
                                </li>
                            ))}



                        </ul>
                    </nav>
                </main>
            </div>
        </div>

    );
};
export default ProductsList;