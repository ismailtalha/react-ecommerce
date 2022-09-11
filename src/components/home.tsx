import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { findProductsByTitle, getProducts, removeAll } from 'api/products';
import { getCategoryproducts, getCategorys } from 'api/category';
import IProductData from 'types/IProduct';
import ICategoryData from 'types/ICategory';
import cart from '../../assets/icons/cart.png'
const Home: React.FC = () => {
    const [Categories, setCategories] = useState<Array<string>>([]);
    const [CategoryProducts, setCategoryProducts] = useState<Array<IProductData>>([]);
    const [categorytab, setcategorytab] = useState<string>();
    const [Products, setProducts] = useState<Array<IProductData>>([]);
    

    const retrieveCategpories = async () => {
        try {
            debugger
            const response = await getCategorys();
            console.log(response.data);
            setCategories(response.data)

        } catch (e) {
            console.log(e);
        }
    };

    const getCatproducts = async (data: string) => {
        debugger
        const response = await getCategoryproducts(data);
        setcategorytab(data)
        console.log(response.data);
        setCategoryProducts(response.data)
    }
    const gethotProducts = async (count:number) => {
        debugger
        const response = await getProducts();
        console.log(response.data);
        setProducts(response.data.slice(0 , count))
    }
    useEffect(() => {
        retrieveCategpories();
        getCatproducts('electronics')
        gethotProducts(10)
    }, []);

    return (
        <>


            {/* Slider Area */}
            <section className="hero-slider">
                {/* Single Slider */}
                <div className="single-slider">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-lg-9 offset-lg-3 col-12">
                                <div className="text-inner">
                                    <div className="row">
                                        <div className="col-lg-7 col-12">
                                            <div className="hero-text">
                                                <h1>
                                                    <span>UP TO 50% OFF </span>Shirt For Man
                                                </h1>
                                                <p>
                                                    Maboriosam in a nesciung eget magnae <br /> dapibus
                                                    disting tloctio in the find it pereri <br /> odiy
                                                    maboriosm.
                                                </p>
                                                <div className="button">
                                                    <a href="#" className="btn">
                                                        Shop Now!
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*/ End Single Slider */}
            </section>
            {/*/ End Slider Area */}
            {/* Start Small Banner  */}
            <section className="small-banner section">
                <div className="container-fluid">
                    <div className="row">
                        {/* Single Banner  */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-banner">
                                <img src="https://via.placeholder.com/600x370" alt="#" />
                                <div className="content">
                                    <p>Man's Collectons</p>
                                    <h3>
                                        Summer travel <br /> collection
                                    </h3>
                                    <a href="#">Discover Now</a>
                                </div>
                            </div>
                        </div>
                        {/* /End Single Banner  */}
                        {/* Single Banner  */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-banner">
                                <img src="https://via.placeholder.com/600x370" alt="#" />
                                <div className="content">
                                    <p>Bag Collectons</p>
                                    <h3>
                                        Awesome Bag <br /> 2020
                                    </h3>
                                    <a href="#">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        {/* /End Single Banner  */}
                        {/* Single Banner  */}
                        <div className="col-lg-4 col-12">
                            <div className="single-banner tab-height">
                                <img src="https://via.placeholder.com/600x370" alt="#" />
                                <div className="content">
                                    <p>Flash Sale</p>
                                    <h3>
                                        Mid Season <br /> Up to <span>40%</span> Off
                                    </h3>
                                    <a href="#">Discover Now</a>
                                </div>
                            </div>
                        </div>
                        {/* /End Single Banner  */}
                    </div>
                </div>
            </section>
            {/* End Small Banner */}
            {/* Start Product Area */}
            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Trending Item</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-info">
                                <div className="nav-main">
                                    {/* Tab Nav */}
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        {
                                            Categories.map((data: string) => {
                                                return <li className="nav-item">
                                                    <a
                                                        className="nav-link active"
                                                        data-toggle="tab"
                                                        href={"#" + data}
                                                        onClick={() => { getCatproducts(data) }}
                                                        role="tab"
                                                    >
                                                        {data}
                                                    </a>
                                                </li>
                                            })
                                        }
                                    </ul>
                                    {/*/ End Tab Nav */}
                                </div>
                                <div className="tab-content" id="myTabContent">
                                    {/* Start Single Tab */}
                                    <div
                                        className="tab-pane fade show active"
                                        id={categorytab}
                                        role="tabpanel"
                                    >
                                        <div className="tab-single">
                                            <div className="row">
                                                {
                                                    CategoryProducts.map((data: IProductData) => (
                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                            <div className="single-product">
                                                                <div className="product-img">
                                                                    <a href="product-details.html">
                                                                        <img
                                                                            className="default-img"
                                                                            src={data.image}
                                                                            alt="#"
                                                                        />
                                                                        <img
                                                                            className="hover-img"
                                                                            src={data.image}
                                                                            alt="#"
                                                                        />
                                                                    </a>
                                                                    <div className="button-head">
                                                                        <div className="product-action">
                                                                            <a
                                                                                data-toggle="modal"
                                                                                data-target="#exampleModal"
                                                                                title="Quick View"
                                                                                href="#"
                                                                            >
                                                                                <i className=" ti-eye" />
                                                                                <span>Quick Shop</span>
                                                                            </a>
                                                                            <a title="Wishlist" href="#">
                                                                                <i className=" ti-heart " />
                                                                                <span>Add to Wishlist</span>
                                                                            </a>
                                                                            <a title="Compare" href="#">
                                                                                <i className="ti-bar-chart-alt" />
                                                                                <span>Add to Compare</span>
                                                                            </a>
                                                                        </div>
                                                                        <div className="product-action-2">
                                                                            <a title="Add to cart" href="#">
                                                                                Add to cart
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="product-content">
                                                                    <h3>
                                                                        <a href="product-details.html">
                                                                            {data.title}
                                                                        </a>
                                                                    </h3>
                                                                    <div className="product-price">
                                                                        <span>{"$"+data.price}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    )}

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Product Area */}
            {/* Start Midium Banner  */}
            <section className="midium-banner">
                <div className="container">
                    <div className="row">
                        {/* Single Banner  */}
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="single-banner">
                                <img src="https://via.placeholder.com/600x370" alt="#" />
                                <div className="content">
                                    <p>Man's Collectons</p>
                                    <h3>
                                        Man's items <br />
                                        Up to<span> 50%</span>
                                    </h3>
                                    <a href="#">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        {/* /End Single Banner  */}
                        {/* Single Banner  */}
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="single-banner">
                                <img src="https://via.placeholder.com/600x370" alt="#" />
                                <div className="content">
                                    <p>shoes women</p>
                                    <h3>
                                        mid season <br /> up to <span>70%</span>
                                    </h3>
                                    <a href="#" className="btn">
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* /End Single Banner  */}
                    </div>
                </div>
            </section>
            {/* End Midium Banner */}
            {/* Start Most Popular */}
            <div className="product-area most-popular section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Hot Item</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="owl-carousel popular-slider">
                                {/* Start Single Product */}
                                <div className="single-product">
                                <div className="product-img">
                                        <a href="product-details.html">
                                            <img
                                                className="default-img"
                                                src="https://via.placeholder.com/550x750"
                                                alt="#"
                                            />
                                            <img
                                                className="hover-img"
                                                src="https://via.placeholder.com/550x750"
                                                alt="#"
                                            />
                                            <span className="out-of-stock">Hot</span>
                                        </a>
                                        <div className="button-head">
                                            <div className="product-action">
                                                <a
                                                    data-toggle="modal"
                                                    data-target="#exampleModal"
                                                    title="Quick View"
                                                    href="#"
                                                >
                                                    <i className=" ti-eye" />
                                                    <span>Quick Shop</span>
                                                </a>
                                                <a title="Wishlist" href="#">
                                                    <i className=" ti-heart " />
                                                    <span>Add to Wishlist</span>
                                                </a>
                                                <a title="Compare" href="#">
                                                    <i className="ti-bar-chart-alt" />
                                                    <span>Add to Compare</span>
                                                </a>
                                            </div>
                                            <div className="product-action-2">
                                                <a title="Add to cart" href="#">
                                                    Add to cart
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h3>
                                            <a href="product-details.html">Black Sunglass For Women</a>
                                        </h3>
                                        <div className="product-price">
                                            <span className="old">$60.00</span>
                                            <span>$50.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-product">
                                <div className="product-img">
                                        <a href="product-details.html">
                                            <img
                                                className="default-img"
                                                src="https://via.placeholder.com/550x750"
                                                alt="#"
                                            />
                                            <img
                                                className="hover-img"
                                                src="https://via.placeholder.com/550x750"
                                                alt="#"
                                            />
                                            <span className="out-of-stock">Hot</span>
                                        </a>
                                        <div className="button-head">
                                            <div className="product-action">
                                                <a
                                                    data-toggle="modal"
                                                    data-target="#exampleModal"
                                                    title="Quick View"
                                                    href="#"
                                                >
                                                    <i className=" ti-eye" />
                                                    <span>Quick Shop</span>
                                                </a>
                                                <a title="Wishlist" href="#">
                                                    <i className=" ti-heart " />
                                                    <span>Add to Wishlist</span>
                                                </a>
                                                <a title="Compare" href="#">
                                                    <i className="ti-bar-chart-alt" />
                                                    <span>Add to Compare</span>
                                                </a>
                                            </div>
                                            <div className="product-action-2">
                                                <a title="Add to cart" href="#">
                                                    Add to cart
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h3>
                                            <a href="product-details.html">Black Sunglass For Women</a>
                                        </h3>
                                        <div className="product-price">
                                            <span className="old">$60.00</span>
                                            <span>$50.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-product">
                                <div className="product-img">
                                        <a href="product-details.html">
                                            <img
                                                className="default-img"
                                                src="https://via.placeholder.com/550x750"
                                                alt="#"
                                            />
                                            <img
                                                className="hover-img"
                                                src="https://via.placeholder.com/550x750"
                                                alt="#"
                                            />
                                            <span className="out-of-stock">Hot</span>
                                        </a>
                                        <div className="button-head">
                                            <div className="product-action">
                                                <a
                                                    data-toggle="modal"
                                                    data-target="#exampleModal"
                                                    title="Quick View"
                                                    href="#"
                                                >
                                                    <i className=" ti-eye" />
                                                    <span>Quick Shop</span>
                                                </a>
                                                <a title="Wishlist" href="#">
                                                    <i className=" ti-heart " />
                                                    <span>Add to Wishlist</span>
                                                </a>
                                                <a title="Compare" href="#">
                                                    <i className="ti-bar-chart-alt" />
                                                    <span>Add to Compare</span>
                                                </a>
                                            </div>
                                            <div className="product-action-2">
                                                <a title="Add to cart" href="#">
                                                    Add to cart
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h3>
                                            <a href="product-details.html">Black Sunglass For Women</a>
                                        </h3>
                                        <div className="product-price">
                                            <span className="old">$60.00</span>
                                            <span>$50.00</span>
                                        </div>
                                    </div>
                                </div>
                                {/* End Single Product */}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Most Popular Area */}
            {/* Start Shop Home List  */}
            <section className="shop-home-list section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shop-section-title">
                                        <h1>On sale</h1>
                                    </div>
                                </div>
                            </div>
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h4 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h4>
                                            <p className="price with-discount">$59</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h5>
                                            <p className="price with-discount">$44</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h5>
                                            <p className="price with-discount">$89</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shop-section-title">
                                        <h1>Best Seller</h1>
                                    </div>
                                </div>
                            </div>
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h5>
                                            <p className="price with-discount">$65</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h5>
                                            <p className="price with-discount">$33</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h5>
                                            <p className="price with-discount">$77</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shop-section-title">
                                        <h1>Top viewed</h1>
                                    </div>
                                </div>
                            </div>
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h5>
                                            <p className="price with-discount">$22</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h5>
                                            <p className="price with-discount">$35</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                            {/* Start Single List  */}
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <img src="https://via.placeholder.com/115x140" alt="#" />
                                            <a href="#" className="buy">
                                                <i className="fa fa-shopping-bag" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title">
                                                <a href="#">Licity jelly leg flat Sandals</a>
                                            </h5>
                                            <p className="price with-discount">$99</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Single List  */}
                        </div>
                    </div>
                </div>
            </section>
            {/* End Shop Home List  */}
            {/* Start Cowndown Area */}
            <section className="cown-down">
                <div className="section-inner ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6 col-12 padding-right">
                                <div className="image">
                                    <img src="https://via.placeholder.com/750x590" alt="#" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 padding-left">
                                <div className="content">
                                    <div className="heading-block">
                                        <p className="small-title">Deal of day</p>
                                        <h3 className="title">Beatutyful dress for women</h3>
                                        <p className="text">
                                            Suspendisse massa leo, vestibulum cursus nulla sit amet,
                                            frungilla placerat lorem. Cars fermentum, sapien.{" "}
                                        </p>
                                        <h1 className="price">
                                            $1200 <s>$1890</s>
                                        </h1>
                                        <div className="coming-time">
                                            <div className="clearfix" data-countdown="2021/02/30" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* /End Cowndown Area */}

            {/* Start Shop Services Area */}
            <section className="shop-services section home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            {/* Start Single Service */}
                            <div className="single-service">
                                <i className="ti-rocket" />
                                <h4>Free shiping</h4>
                                <p>Orders over $100</p>
                            </div>
                            {/* End Single Service */}
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            {/* Start Single Service */}
                            <div className="single-service">
                                <i className="ti-reload" />
                                <h4>Free Return</h4>
                                <p>Within 30 days returns</p>
                            </div>
                            {/* End Single Service */}
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            {/* Start Single Service */}
                            <div className="single-service">
                                <i className="ti-lock" />
                                <h4>Sucure Payment</h4>
                                <p>100% secure payment</p>
                            </div>
                            {/* End Single Service */}
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            {/* Start Single Service */}
                            <div className="single-service">
                                <i className="ti-tag" />
                                <h4>Best Peice</h4>
                                <p>Guaranteed price</p>
                            </div>
                            {/* End Single Service */}
                        </div>
                    </div>
                </div>
            </section>
            {/* End Shop Services Area */}
            {/* Start Shop Newsletter  */}
            <section className="shop-newsletter section">
                <div className="container">
                    <div className="inner-top">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2 col-12">
                                {/* Start Newsletter Inner */}
                                <div className="inner">
                                    <h4>Newsletter</h4>
                                    <p>
                                        {" "}
                                        Subscribe to our newsletter and get <span>10%</span> off your
                                        first purchase
                                    </p>
                                    <form
                                        action="mail/mail.php"
                                        method="get"
                                        target="_blank"
                                        className="newsletter-inner"
                                    >
                                        <input
                                            name="EMAIL"
                                            placeholder="Your email address"

                                            type="email"
                                        />
                                        <button className="btn">Subscribe</button>
                                    </form>
                                </div>
                                {/* End Newsletter Inner */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Shop Newsletter */}
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span className="ti-close" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row no-gutters">
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    {/* Product Slider */}
                                    <div className="product-gallery">
                                        <div className="quickview-slider-active">
                                            <div className="single-slider">
                                                <img src="https://via.placeholder.com/569x528" alt="#" />
                                            </div>
                                            <div className="single-slider">
                                                <img src="https://via.placeholder.com/569x528" alt="#" />
                                            </div>
                                            <div className="single-slider">
                                                <img src="https://via.placeholder.com/569x528" alt="#" />
                                            </div>
                                            <div className="single-slider">
                                                <img src="https://via.placeholder.com/569x528" alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Product slider */}
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="quickview-content">
                                        <h2>Flared Shift Dress</h2>
                                        <div className="quickview-ratting-review">
                                            <div className="quickview-ratting-wrap">
                                                <div className="quickview-ratting">
                                                    <i className="yellow fa fa-star" />
                                                    <i className="yellow fa fa-star" />
                                                    <i className="yellow fa fa-star" />
                                                    <i className="yellow fa fa-star" />
                                                    <i className="fa fa-star" />
                                                </div>
                                                <a href="#"> (1 customer review)</a>
                                            </div>
                                            <div className="quickview-stock">
                                                <span>
                                                    <i className="fa fa-check-circle-o" /> in stock
                                                </span>
                                            </div>
                                        </div>
                                        <h3>$29.00</h3>
                                        <div className="quickview-peragraph">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                Mollitia iste laborum ad impedit pariatur esse optio tempora
                                                sint ullam autem deleniti nam in quos qui nemo ipsum
                                                numquam.
                                            </p>
                                        </div>
                                        <div className="size">
                                            <div className="row">
                                                <div className="col-lg-6 col-12">
                                                    <h5 className="title">Size</h5>
                                                    <select>
                                                        <option>s</option>
                                                        <option>m</option>
                                                        <option>l</option>
                                                        <option>xl</option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-6 col-12">
                                                    <h5 className="title">Color</h5>
                                                    <select>
                                                        <option>orange</option>
                                                        <option>purple</option>
                                                        <option>black</option>
                                                        <option>pink</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="quantity">
                                            {/* Input Order */}
                                            <div className="input-group">
                                                <div className="button minus">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-number"

                                                        data-type="minus"
                                                        data-field="quant[1]"
                                                    >
                                                        <i className="ti-minus" />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="quant[1]"
                                                    className="input-number"
                                                    data-min={1}
                                                    data-max={1000}
                                                    defaultValue={1}
                                                />
                                                <div className="button plus">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-number"
                                                        data-type="plus"
                                                        data-field="quant[1]"
                                                    >
                                                        <i className="ti-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/*/ End Input Order */}
                                        </div>
                                        <div className="add-to-cart">
                                            <a href="#" className="btn">
                                                Add to cart
                                            </a>
                                            <a href="#" className="btn min">
                                                <i className="ti-heart" />
                                            </a>
                                            <a href="#" className="btn min">
                                                <i className="fa fa-compress" />
                                            </a>
                                        </div>
                                        <div className="default-social">
                                            <h4 className="share-now">Share:</h4>
                                            <ul>
                                                <li>
                                                    <a className="facebook" href="#">
                                                        <i className="fa fa-facebook" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="twitter" href="#">
                                                        <i className="fa fa-twitter" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="youtube" href="#">
                                                        <i className="fa fa-pinterest-p" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dribbble" href="#">
                                                        <i className="fa fa-google-plus" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal end */}

        </>

    )
};
export default Home;