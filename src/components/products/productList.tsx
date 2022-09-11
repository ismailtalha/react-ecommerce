import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { findProductsByTitle, getProducts, removeAll } from 'api/products';
import IProductData from 'types/IProduct';
import cart from '../../assets/icons/cart.png'
import { json } from "stream/consumers";
const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Array<IProductData>>([]);
    const [currentProduct, setCurrentProduct] = useState<IProductData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [limit, setLimit] = useState<number>(3);
    const [totalPages, setTotalPages] = useState<Array<number>>([]);
    const allProducts = useRef<Array<IProductData>>([]);
    const [filtertext, setMessage] = useState('');
    const [count, setcount] = useState(0);
    const [cartcount, setcartCount] = useState(0);
    let selectvalue = useRef("Price");
    let cartCount = useRef(0);
    const [cartData, setcartData] = useState<Array<IProductData>>([]);
    let cartDataarr = useRef<Array<IProductData>>([]);
    let [totalPrice, settotalPrice] = useState(0)
    let wishlistCount = useRef(0);
    const [wishlistData, setwishlistData] = useState<Array<IProductData>>([]);
    let wishlistDataarr = useRef<Array<IProductData>>([]);
    const [wishlistcount, setwishlistcount] = useState(0);
    const [checkSelected, setcheckSelected] = useState(0);


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
            setcount(response.data.length)
            setPagination(response.data.length, limit)
            handleSelect(1)
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
        debugger
        let sortedarray: Array<IProductData> = [];
        selectvalue.current = e.target ? e.target.value : "0";
        if (selectvalue.current == "1") {
            sortedarray = allProducts.current.sort((a, b) => a.title.localeCompare(b.title))
        }
        else if (selectvalue.current == "2") {
            sortedarray = allProducts.current.sort((a, b) => b.title.localeCompare(a.title))
        }
        else if (selectvalue.current == "3") {
            sortedarray = allProducts.current.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        }
        else if (selectvalue.current == "4") {
            sortedarray = allProducts.current.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        }
        else {
            sortedarray = allProducts.current.sort((a, b) => a.title.localeCompare(b.title))
        }
        setProducts(sortedarray)
        // allProducts.current = sortedarray;
        getPaginatedProducts(1)
    }
    const getSortedProducts = (order: number) => {

        let key: any = selectvalue.current;
        let sortedarray: Array<IProductData> = [];

        if (key == "Price" && order == 1) {
            sortedarray = allProducts.current.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        }
        else if (key == "Price" && order == 2) {
            sortedarray = allProducts.current.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))

        }
        else if (key == "Title" && order == 1) {
            sortedarray = allProducts.current.sort((a, b) => a.title.localeCompare(b.title))
        }
        else if (key == "Title" && order == 2) {
            sortedarray = allProducts.current.sort((a, b) => b.title.localeCompare(a.title))
        }
        setProducts(sortedarray)
        // allProducts.current = sortedarray;
        getPaginatedProducts(1)


    }

    const updateCartCount = (data: IProductData) => {
        debugger
        cartCount.current = cartCount.current + 1;
        setcartCount(cartCount.current);
        cartDataarr.current.push(data)
        let total = 0;
        cartDataarr.current.forEach(element => {
            total = total + parseFloat(element.price);
        });
        console.log(total);
        settotalPrice(parseFloat(total.toFixed(2)))
        setcartData(cartDataarr.current)

    }
    const removeCart = (data: IProductData) => {
        debugger
        cartCount.current = cartCount.current ? cartCount.current - 1 : 0;
        setcartCount(cartCount.current);
        let index = cartDataarr.current.findIndex((a) => a.id == data.id)
        cartDataarr.current.splice(index, 1);
        let total = 0;
        cartDataarr.current.forEach(element => {
            total = total + parseFloat(element.price);
        });
        console.log(total);
        settotalPrice(parseFloat(total.toFixed(2)))
        setcartData(cartDataarr.current)

    }
    const updateWishlistCount = (data: IProductData) => {
        debugger
        let index = wishlistDataarr.current.findIndex((a) => a.id == data.id)
        if (index >= 0) {
            data.activeIndex = 0;
            removeWishlist(data);

            return;
        }
        data.activeIndex = 1;
        wishlistCount.current = wishlistCount.current + 1;
        setwishlistcount(wishlistCount.current);
        wishlistDataarr.current.push(data)

        setwishlistData(wishlistDataarr.current)

    }
    const removeWishlist = (data: IProductData) => {
        debugger
        wishlistCount.current = wishlistCount.current ? wishlistCount.current - 1 : 0;
        setwishlistcount(wishlistCount.current);
        let index = wishlistDataarr.current.findIndex((a) => a.id == data.id)
        wishlistDataarr.current.splice(index, 1);

        setwishlistData(wishlistDataarr.current)

    }
    const priceFilter = async (event: any) => {
        debugger
        let checked = event.target.checked
        const response = await getProducts();
        allProducts.current = response.data;
        if (checked && event.target.id == 1) {
            setcheckSelected(1)
            allProducts.current = allProducts.current.filter((a: IProductData) => parseFloat(a.price) >= 0 && parseFloat(a.price) < 500)
        }
        else if (checked && event.target.id == 2) {
            setcheckSelected(2)
            allProducts.current = allProducts.current.filter((a: IProductData) => parseFloat(a.price) >= 500 && parseFloat(a.price) < 2000)
        }
        else if (checked && event.target.id == 3) {
            setcheckSelected(3)
            allProducts.current = allProducts.current.filter((a: IProductData) => parseFloat(a.price) >= 2000)
        }
        else {
            setcheckSelected(0)
        }

        setcount(allProducts.current.length)
        setPagination(allProducts.current.length, limit)
        handleSelect(1)

        // setPaginationCount(filteredProducts.length)


    }
    useEffect(() => {
        retrieveProducts();
    }, []);

    return (
        // <div className="container">
        //     <div className="row">

        //         <main className="col-md-12">
        //             <header className="border-bottom mb-4 pb-3">
        //                 <div className="form-inline">
        //                     <span className="mr-md-auto">{count} Items found </span>
        //                     <span>Sort By:</span>
        //                     <select className="mr-2 form-control" onChange={handleSelect}>
        //                         <option>Price</option>
        //                         <option>Title</option>
        //                     </select>
        //                     <button type="button" className="btn btn-primary btn-sm" onClick={() => getSortedProducts(1)}>Asc</button>
        //                     <button type="button" className="btn btn-secondary btn-sm" onClick={() => getSortedProducts(2)}>Desc</button>
        //                     <span><img src={cart} className="fa fa-bars" />{cartcount} </span>

        //                 </div>
        //             </header>
        //             <input
        //                 type="text"
        //                 id="message"
        //                 name="message"
        //                 onChange={handleChange}
        //                 value={filtertext}
        //             />
        //             <div className="row">

        //                 {products.map((data, i: number) => (
        //                     <div className="col-md-4" key={i}>
        //                         <figure className="card card-product-grid">
        //                             <div className="img-wrap">
        //                                 <img src={data.image} className="img-fluid" />
        //                             </div> 
        //                             <figcaption className="info-wrap">
        //                                 <div className="fix-height">
        //                                     <a href="#" className="title">{data.title}</a>
        //                                     <div className="price-wrap mt-2">
        //                                         <span className="price">{data.price}</span>
        //                                     </div> 
        //                                 </div>
        //                                 <button className="btn btn-block btn-primary" onClick={() => updateCartCount()}>Add To Cart</button>
        //                             </figcaption>
        //                         </figure>

        //                     </div>
        //                 ))}
        //             </div> 

        //             <nav className="mt-4" aria-label="Page navigation sample">
        //                 <ul className="pagination">
        //                     {totalPages.map((p, i: number) => (
        //                         <li key={i} className="page-item active" onClick={() => getPaginatedProducts(p)}>
        //                             <a className="page-link" href="#">{p}</a>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </nav>
        //         </main>
        //     </div>
        // </div>

        // <div className="container">
        //     <div className="row">
        //         <main className="col-md-12">
        //             <header className="border-bottom mb-4 pb-3">
        //                 <div className="form-inline">
        //                     <span className="mr-md-auto">{count} Items found </span>
        //                     <span>Sort By:</span>
        //                     <select className="mr-2 form-control" onChange={handleSelect}>
        //                         <option>Price</option>
        //                         <option>Title</option>
        //                     </select>
        //                     <button type="button" className="btn btn-primary btn-sm" onClick={() => getSortedProducts(1)}>Asc</button>
        //                     <button type="button" className="btn btn-secondary btn-sm" onClick={() => getSortedProducts(2)}>Desc</button>
        //                     <span><img src={cart} className="fa fa-bars" />{cartcount} </span>
        //                 </div>
        //             </header>
        //             <input
        //                 type="text"
        //                 id="message"
        //                 name="message"
        //                 onChange={handleChange}
        //                 value={filtertext}
        //             />
        //             <div className="row">
        //                 {products.map((data, i: number) => (
        //                     <div className="col-md-4" key={i}>
        //                         <figure className="card card-product-grid">
        //                             <div className="img-wrap">
        //                                 <img src={data.image} className="img-fluid" />
        //                             </div> 
        //                             <figcaption className="info-wrap">
        //                                 <div className="fix-height">
        //                                     <a href="#" className="title">{data.title}</a>
        //                                     <div className="price-wrap mt-2">
        //                                         <span className="price">{data.price}</span>
        //                                     </div> 
        //                                 </div>
        //                                 <button className="btn btn-block btn-primary" onClick={() => updateCartCount()}>Add To Cart</button>
        //                             </figcaption>
        //                         </figure>
        //                     </div>
        //                 ))}
        //             </div> 
        //             <nav className="mt-4" aria-label="Page navigation sample">
        //                 <ul className="pagination">
        //                     {totalPages.map((p, i: number) => (
        //                         <li key={i} className="page-item active" onClick={() => getPaginatedProducts(p)}>
        //                             <a className="page-link" href="#">{p}</a>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </nav>
        //         </main>
        //     </div>
        // </div>
        <React.Fragment>
            <header className="header shop">
                <div className="topbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-12">
                                <div className="top-left">
                                    <ul className="list-main">
                                        <li><i className="ti-headphone-alt"></i> +060 (800) 801-582</li>
                                        <li><i className="ti-email"></i> support@dealerz.com</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12 col-12">
                                <div className="right-content">
                                    <ul className="list-main">
                                        <li><i className="ti-location-pin"></i> Store location</li>
                                        <li><i className="ti-alarm-clock"></i> <a href="javascript:void(0)">Daily deal</a></li>
                                        <li><i className="ti-user"></i> <a href="javascript:void(0)">My account</a></li>
                                        <li><i className="ti-power-off"></i><a href="javascript:void(0)">Login</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="middle-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-12">
                                <div className="logo">
                                    <a href="#"><img src="images/logo.png" alt="logo" /></a>
                                </div>

                                <div className="search-top">
                                    <div className="top-search"><a href="javascript:void(0)"><i className="ti-search"></i></a></div>
                                    <div className="search-top">
                                        <form className="search-form">
                                            <input type="text" placeholder="Search here..." name="search" />
                                            <button value="search" type="submit"><i className="ti-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                                <div className="mobile-nav"></div>
                            </div>
                            <div className="col-lg-8 col-md-7 col-12">
                                <div className="search-bar-top">
                                    <div className="search-bar">

                                        <div>
                                            <input name="searchtxt" placeholder="Search Products Here....." type="text" value={filtertext} onChange={handleChange} />
                                            {/* <button className="btnn"><i className="ti-search" onClick={() => handleChange}></i></button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-12">
                                <div className="right-bar">
                                    <div className="sinlge-bar shopping">
                                        <a href="#" className="single-icon"><i className="fa fa-heart-o"></i> <span className="total-count">{wishlistcount}</span></a>
                                        <div className="shopping-item">
                                            <div className="dropdown-cart-header">
                                                <span>{wishlistcount} Items</span>
                                                <a href="#">View Wishlist</a>
                                            </div>
                                            <ul className="shopping-list">

                                                {wishlistData.map((data: IProductData) => {
                                                    return <li>
                                                        <a href="#" className="remove" title="Remove this item"></a>
                                                        <a className="cart-img" href="#"><img src={data.image} alt="#" /></a>
                                                        <h4><a href="#">{data.title}</a></h4>
                                                    </li>
                                                })}

                                            </ul>

                                        </div>
                                    </div>
                                    {/* <div className="sinlge-bar">
                                        <a href="#" className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></a>
                                    </div>
                                   */}
                                    <div className="sinlge-bar shopping">
                                        <a href="#" className="single-icon"><i className="ti-bag"></i> <span className="total-count">{cartcount}</span></a>
                                        <div className="shopping-item">
                                            <div className="dropdown-cart-header">
                                                <span>{cartcount} Items</span>
                                                <a href="#">View Cart</a>
                                            </div>
                                            <ul className="shopping-list">

                                                {cartData.map((data: IProductData) => {
                                                    return <li>
                                                        <a href="#" className="remove" title="Remove this item"><i className="fa fa-remove" onClick={() => { removeCart(data) }}></i></a>
                                                        <a className="cart-img" href="#"><img src={data.image} alt="#" /></a>
                                                        <h4><a href="#">{data.title}</a></h4>
                                                        <p className="quantity">1x - <span className="amount">{data.price}</span></p>
                                                    </li>
                                                })}

                                            </ul>
                                            <div className="bottom">
                                                <div className="total">
                                                    <span>Total</span>
                                                    <span className="total-amount">{totalPrice}</span>
                                                </div>
                                                <a href="checkout.html" className="btn animate">Checkout</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-inner">
                    <div className="container">
                        <div className="cat-nav-head">
                            <div className="row">
                                <div className="col-12">
                                    <div className="menu-area">
                                        <nav className="navbar navbar-expand-lg">
                                            <div className="navbar-collapse">
                                                <div className="nav-inner">
                                                    <ul className="nav main-menu menu navbar-nav">
                                                        <li ><a href="javascript:void(0)">Home</a></li>
                                                        <li className="active"><a href="javascript:void(0)">Product</a></li>
                                                        <li aria-disabled><a href="javascript:void(0)">Service</a></li>
                                                        <li><a href="javascript:void(0)">Contact Us</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="product-area shop-sidebar shop section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="shop-sidebar">
                                {/* <div className="single-widget category">
                                    <h3 className="title">Categories</h3>
                                    <ul className="categor-list">
                                        <li><a href="#">T-shirts</a></li>
                                        <li><a href="#">jacket</a></li>
                                        <li><a href="#">jeans</a></li>
                                        <li><a href="#">sweatshirts</a></li>
                                        <li><a href="#">trousers</a></li>
                                        <li><a href="#">kitwears</a></li>
                                        <li><a href="#">accessories</a></li>
                                    </ul>
                                </div> */}

                                <div className="single-widget range">
                                    <h3 className="title">Shop by Price</h3>
                                    <div className="price-filter">
                                        {/* <div className="price-filter-inner">
                                            <div id="slider-range"></div>
                                            <div className="price_slider_amount">
                                                <div className="label-input">
                                                    <span>Range:</span><input type="text" id="amount" name="price" placeholder="Add Your Price" />
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <ul className="check-box-list">
                                        <li>
                                            <label className="checkbox-inline" ><input name="price" id="0" checked={checkSelected == 0 ? true : false} type="radio" onChange={(e) => { priceFilter(e) }} />No Price Filter</label>
                                        </li>
                                        <li>
                                            <label className="checkbox-inline" ><input name="price" id="1" type="radio" checked={checkSelected == 1 ? true : false} onChange={(e) => { priceFilter(e) }} />$0 - $500</label>
                                        </li>
                                        <li>
                                            <label className="checkbox-inline" ><input name="price" id="2" type="radio" checked={checkSelected == 2 ? true : false} onChange={(e) => { priceFilter(e) }} /> Above $500</label>
                                        </li>
                                        <li>
                                            <label className="checkbox-inline" ><input name="price" id="3" type="radio" checked={checkSelected == 3 ? true : false} onChange={(e) => { priceFilter(e) }} />Above 2000 </label>
                                        </li>
                                    </ul>
                                </div>




                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shop-top">
                                        <div className="shop-shorter">
                                            <div className="single-shorter">
                                                <label>Total Products : {count}</label>
                                                {/* <label>Show :</label>
                                                <select>
                                                    <option>09</option>
                                                    <option>15</option>
                                                    <option>25</option>
                                                    <option>30</option>
                                                </select> */}
                                            </div>
                                            {/* <div className="single-shorter">
                                                <label>Sort By :</label>
                                                <select onChange={handleSelect}>
                                                    <option>Title</option>
                                                    <option>Price</option>
                                                </select>
                                                <button type="button" className="btn btn-primary btn-sm" onClick={() => getSortedProducts(1)}>Asc</button>
        //                                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => getSortedProducts(2)}>Desc</button>
                                            </div> */}
                                        </div>
                                        <ul className="view-mode">
                                            <label>Sort By :</label>
                                            <select onChange={handleSelect}>
                                                <option value={1}>Title A - Z</option>
                                                <option value={2}>Title Z - A</option>
                                                <option value={3}>Price High to Low</option>
                                                <option value={4}>Price Low to High</option>
                                            </select>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {products.map((data) => (
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="img-res default-img" src={data.image} alt="#" />
                                                    <img className="img-res hover-img" src={data.image} alt="#" />
                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i className=" ti-eye"></i><span>Quick Shop</span></a>
                                                        <a title="Wishlist" href="javascript:void(0)" onClick={() => updateWishlistCount(data)}><i className={data.activeIndex == 1 ? 'fa fa-heart red-color' : 'fa fa-heart-o red-color'}></i><span>Add to Wishlist</span></a>
                                                        {/* <a title="Compare" href="#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a> */}
                                                    </div>
                                                    <div className="product-action-2">
                                                        <span title="Add to cart" onClick={() => updateCartCount(data)}>Add to cart</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><a href="product-details.html">{data.title}</a></h3>
                                                <div className="product-price">
                                                    <span>{data.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">

                                    {totalPages.map((p, i: number) => (
                                        <li key={i} className="page-item pointerhand" onClick={() => getPaginatedProducts(p)}>
                                            <span className="page-link">{p}</span>
                                        </li>
                                    ))}

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>

    );
};
export default ProductsList;