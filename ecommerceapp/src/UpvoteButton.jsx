import { Button } from 'antd'

function UpvoteButton({ item, onUpvote }) {
  const upvotes = Number(item.upvotes || 0)

  return (
    <Button type="primary" onClick={() => onUpvote(item.id)}>
      upvote ({upvotes})
    </Button>
  )
}

export default UpvoteButton
