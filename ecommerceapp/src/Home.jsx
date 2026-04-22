import { useState, useEffect } from 'react'
import Container from './Container'
import { get, del, post } from 'aws-amplify/api'
import { List, message } from 'antd'
import checkUser from './checkUser'
import UpvoteButton from './UpvoteButton'

function Main() {
  const [state, setState] = useState({products: [], loading: false})
  const [user, updateUser] = useState({})

//   let didCancel = false

  async function getProducts() {
    const request = get({ 
        apiName: 'ecommerceapi', 
        path: '/products' 
    })
    const {body} = await request.response;
    const data = await body.json();

    console.log('data: ', data)
    // if (didCancel) return
    if (!data || !data.data || !data.data.Items) return
    setState({
      products: data.data.Items, loading: false
    })
  }

  async function deleteItem(id) {
    try {
      const products = state.products.filter(p => p.id !== id)

      const request = del({
        apiName: 'ecommerceapi',
        // path: '/products',
        // options: { body: { id } }
        path: `/products/${id}`
      });
      await request.response;

      setState({ ...state, products })
      console.log('successfully deleted item')
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function upvoteItem(id) {
    try {
      const request = post({
        apiName: 'ecommerceapi',
        path: `/products/${id}/upvote`
      })
      const response = await request.response
      const data = await response.body.json()
      const upvotes = data && data.data ? data.data.upvotes : undefined

      const products = state.products.map((product) => {
        if (product.id !== id) return product

        if (typeof upvotes === 'number') {
          return { ...product, upvotes }
        }

        return { ...product, upvotes: Number(product.upvotes || 0) + 1 }
      })

      setState({ ...state, products })

      if (typeof upvotes !== 'number') {
        message.info('Upvote saved locally. Run amplify push if backend is not updated yet.')
      }
    } catch (err) {
      console.log('error upvoting item: ', err)
      message.error('Unable to upvote right now. Please try again.')
    }
  }

  function getActions(item) {
    const isLoggedIn = Boolean(user.isLoggedIn || user.username)
    const isAdmin = Boolean(user.isAuthorized)
    const canUpvote = isLoggedIn && !isAdmin
    const actions = []

    if (canUpvote) {
      actions.push(
        <UpvoteButton
          key={`upvote-${item.id}`}
          item={item}
          onUpvote={upvoteItem}
        />
      )
    }

    if (isAdmin) {
      actions.push(
        <p onClick={() => deleteItem(item.id)} key={`delete-${item.id}`}>
          delete
        </p>
      )
    }

    return actions.length ? actions : null
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      getProducts()
    }, 0)
    checkUser(updateUser)
    return () => {
      clearTimeout(timerId)
      // didCancel = true
    }
  }, [])

  return (
    <Container>
      <h1>Hello World</h1>
      {!user.isLoggedIn && (
        <p>Sign in as a non-admin user to see upvote buttons.</p>
      )}
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={item => (
          <List.Item
            actions={getActions(item)}
          >
            <List.Item.Meta
              title={item.name}
              description={item.price}
            />
          </List.Item>
        )}
      />
    </Container>
  )
}

export default Main