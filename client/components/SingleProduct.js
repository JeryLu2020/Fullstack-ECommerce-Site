import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';
import ListReviews from './ListReviews';
import { getSingleProductThunk } from '../store/singleProduct';
import {
  Button,
  Input,
  Label,
  Modal,
  Header,
  Image,
  Container,
  Segment,
  Grid
} from 'semantic-ui-react';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import { getAllProductsThunk } from '../store/allProducts';
import { NavLink } from 'react-router-dom';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    await this.props.setCartId(this.props.user.id);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async addProduct(product) {
    await this.props.quickAdd({
      quantity: this.state.quantity,
      unitPrice: product.price,
      productId: product.id,
      orderId: this.props.cart.id,
      productName: product.name,
      imageUrl: product.imageUrl
    });
  }

  render() {
    const { product } = this.props;
    const oldReviews = product.reviews;
    const newReviews = this.props.reviews;
    const categories = product.categories;
    return (
      <Container>
        <Segment>
          <Grid columns="two" stackable divided>
            <Grid.Column>
              <Image src={product.imageUrl} />
            </Grid.Column>
            <Grid.Column>
              <h1>{product.name}</h1>
              {this.props.user.isAdmin && (
                <NavLink to={`/products/${product.id}/edit`}>
                  <Button color="blue">EDIT PRODUCT</Button>
                </NavLink>
              )}
              <h3>{`Price: $${product.price}`}</h3>
              <h3>{product.description}</h3>
              <Input
                onChange={this.handleChange}
                name="quantity"
                type="number"
                value={this.state.quantity}
                placeholder="Enter quantity"
                min="0"
                step="1"
              />{' '}
              <Modal
                trigger={
                  <Button
                    className="addToCart"
                    color="teal"
                    onClick={() => this.addProduct(product)}
                    type="button"
                  >
                    Add To Cart
                  </Button>
                }
                basic
                size="small"
              >
                <Header icon="shopping cart" content="Added to your cart!!" />
                <Modal.Content>
                  <p>very cool.</p>
                </Modal.Content>
              </Modal>
              <br />
              <br />
              {categories &&
                categories.map(category => (
                  <div key={category.id}>
                    This product belongs to these categories:
                    <br />
                    <br />
                    <NavLink
                      to={`/products?categoryTag=${category.Name}`}
                      key={category.id}
                    >
                      <Label color="teal" tag size="large">
                        {category.name}
                      </Label>
                    </NavLink>
                  </div>
                ))}
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <ReviewForm
            className="reviewForm"
            productId={product.id}
            userName={`${this.props.user.firstName} ${
              this.props.user.lastName
            }`}
            imageUrl={this.props.user.imageUrl}
          />
          <ListReviews oldReviews={oldReviews} newReviews={newReviews} />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  product: state.singleProductReducer,
  user: state.user,
  cart: state.cartReducer,
  reviews: state.productReviewsReducer
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getSingleProductThunk(productId)),
  quickAdd: item => dispatch(addToCartThunk(item)),
  setCartId: userId => dispatch(setCartIdThunk(userId || '')),
  getCategoryProduct: categoryTag => dispatch(getAllProductsThunk(categoryTag))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
