import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import ProductDataService from "../../service/productService";
import IProductData from '../../types/IProduct';
const ProductsList: React.FC = () => {
    const [Products, setProducts] = useState<Array<IProductData>>([]);
    const [currentProduct, setCurrentProduct] = useState<IProductData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [Paginationcount, setPaginationcount] = useState<string>("");
    const [limit, setLimit] = useState<number>(3);
    const [pagesTotal, setpagesTotal] = useState<Array<number>>([]);
    var allProducts : Array<IProductData>= [];
    useEffect(() => {
        retrieveProducts();
        // setLimit("5")
    }, []);
    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
    const retrieveProducts = () => {
        ProductDataService.getAll()
            .then((response: any) => {
                allProducts = response.data;
                setProducts(response.data);
                setPaginationcount(response.data.length)
                setPagination(response.data.length, limit)
                getPaginatedProducts(1);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
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
        ProductDataService.removeAll()
            .then((response: any) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    const findByTitle = () => {
        ProductDataService.findByTitle(searchTitle)
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
    const setPagination = (totalCount: string, limit: number) => {
        let totalPagesCount = parseInt(totalCount) / limit;
        let pagesarr = [];
        for (let index = 0; index < totalPagesCount; index++) {
            const page = index + 1
            pagesarr.push(page)
        }
        setpagesTotal(pagesarr);

    }
    const getPaginatedProducts = (page:number) => {
        debugger
       let productsarr = allProducts;
       let pageLimit = limit;
       setProducts(productsarr.slice((page - 1) * pageLimit, page * pageLimit))
       
    }
    
    return (

        <div className="container">
            <div className="row">
                <aside className="col-md-3">
                    <div className="card">
                        <article className="filter-group">
                            <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" >
                                    <i className="icon-control fa fa-chevron-down" />
                                    <h6 className="title">Product type</h6>
                                </a>
                            </header>
                            <div className="filter-content collapse show" id="collapse_1" style={{}}>
                                <div className="card-body">
                                    <form className="pb-3">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <div className="input-group-append">
                                                <button className="btn btn-light" type="button"><i className="fa fa-search" /></button>
                                            </div>
                                        </div>
                                    </form>
                                    <ul className="list-menu">
                                        <li><a href="#">People</a></li>
                                        <li><a href="#">Watches </a></li>
                                        <li><a href="#">Cinema</a></li>
                                        <li><a href="#">Clothes</a></li>
                                        <li><a href="#">Home items </a></li>
                                        <li><a href="#">Animals</a></li>
                                        <li><a href="#">People </a></li>
                                    </ul>
                                </div> {/* card-body.// */}
                            </div>
                        </article> {/* filter-group  .// */}
                        <article className="filter-group">
                            <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" >
                                    <i className="icon-control fa fa-chevron-down" />
                                    <h6 className="title">Brands </h6>
                                </a>
                            </header>
                            <div className="filter-content collapse show" id="collapse_2" style={{}}>
                                <div className="card-body">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" defaultChecked className="custom-control-input" />
                                        <div className="custom-control-label">Mercedes
                                            <b className="badge badge-pill badge-light float-right">120</b></div>
                                    </label>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" defaultChecked className="custom-control-input" />
                                        <div className="custom-control-label">Toyota
                                            <b className="badge badge-pill badge-light float-right">15</b></div>
                                    </label>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" defaultChecked className="custom-control-input" />
                                        <div className="custom-control-label">Mitsubishi
                                            <b className="badge badge-pill badge-light float-right">35</b> </div>
                                    </label>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" defaultChecked className="custom-control-input" />
                                        <div className="custom-control-label">Nissan
                                            <b className="badge badge-pill badge-light float-right">89</b> </div>
                                    </label>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label">Honda
                                            <b className="badge badge-pill badge-light float-right">30</b></div>
                                    </label>
                                </div> {/* card-body.// */}
                            </div>
                        </article> {/* filter-group .// */}
                        <article className="filter-group">
                            <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" >
                                    <i className="icon-control fa fa-chevron-down" />
                                    <h6 className="title">Price range </h6>
                                </a>
                            </header>
                            <div className="filter-content collapse show" id="collapse_3" style={{}}>
                                <div className="card-body">
                                    <input type="range" className="custom-range" min={0} max={100} />
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Min</label>
                                            <input className="form-control" placeholder="$0" type="number" />
                                        </div>
                                        <div className="form-group text-right col-md-6">
                                            <label>Max</label>
                                            <input className="form-control" placeholder="$1,0000" type="number" />
                                        </div>
                                    </div> {/* form-row.// */}
                                    <button className="btn btn-block btn-primary">Apply</button>
                                </div>{/* card-body.// */}
                            </div>
                        </article> {/* filter-group .// */}
                        <article className="filter-group">
                            <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" >
                                    <i className="icon-control fa fa-chevron-down" />
                                    <h6 className="title">Sizes </h6>
                                </a>
                            </header>
                            <div className="filter-content collapse show" id="collapse_4" style={{}}>
                                <div className="card-body">
                                    <label className="checkbox-btn">
                                        <input type="checkbox" />
                                        <span className="btn btn-light"> XS </span>
                                    </label>
                                    <label className="checkbox-btn">
                                        <input type="checkbox" />
                                        <span className="btn btn-light"> SM </span>
                                    </label>
                                    <label className="checkbox-btn">
                                        <input type="checkbox" />
                                        <span className="btn btn-light"> LG </span>
                                    </label>
                                    <label className="checkbox-btn">
                                        <input type="checkbox" />
                                        <span className="btn btn-light"> XXL </span>
                                    </label>
                                </div>{/* card-body.// */}
                            </div>
                        </article> {/* filter-group .// */}
                        <article className="filter-group">
                            <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_5" aria-expanded="false" >
                                    <i className="icon-control fa fa-chevron-down" />
                                    <h6 className="title">More filter </h6>
                                </a>
                            </header>
                            <div className="filter-content collapse in" id="collapse_5" style={{}}>
                                <div className="card-body">
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" defaultChecked className="custom-control-input" />
                                        <div className="custom-control-label">Any condition</div>
                                    </label>
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Brand new </div>
                                    </label>
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Used items</div>
                                    </label>
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Very old</div>
                                    </label>
                                </div>{/* card-body.// */}
                            </div>
                        </article> {/* filter-group .// */}
                    </div> {/* card.// */}
                </aside>
                <main className="col-md-9">
                    <header className="border-bottom mb-4 pb-3">
                        <div className="form-inline">
                            <span className="mr-md-auto">32 Items found </span>
                            <select className="mr-2 form-control">
                                <option>Latest items</option>
                                <option>Trending</option>
                                <option>Most Popular</option>
                                <option>Cheapest</option>
                            </select>
                            <div className="btn-group">
                                <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" data-original-title="List view">
                                    <i className="fa fa-bars" /></a>
                                <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" data-original-title="Grid view">
                                    <i className="fa fa-th" /></a>
                            </div>
                        </div>
                    </header>{/* sect-heading */}
                    <div className="row">
                        {Products.map((data) => (
                            <div className="col-md-4">
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
                                        <a href="#" className="btn btn-block btn-primary">Add to cart </a>
                                    </figcaption>
                                </figure>

                            </div>
                        ))}
                    </div> {/* row end.// */}
                    <h3>Pagination Count : {Paginationcount}</h3>
                    <h3>Limit : {limit}</h3>

                    <nav className="mt-4" aria-label="Page navigation sample">
                        <ul className="pagination">
                            {pagesTotal.map((p) => (
                                // <li>{p}</li>
                                <li className="page-item active" onClick={() => getPaginatedProducts(p)}><a className="page-link" href="#">{p}</a></li>
                            ))}



                        </ul>
                    </nav>
                </main>
            </div>
        </div>

    );
};
export default ProductsList;