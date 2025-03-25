import React from 'react'
import mockPostImg from '@/public/profCap.jpg'
import PostItem from '../PostItem/PostItem'
import s from './PostList.module.scss'

const posts = [
    {  _id: '1',
        text: 'string',
        postImg: mockPostImg,
    },
    {  _id: '2',
        text: 'stringstringstringstring',
        postImg: mockPostImg,
    },
    {  _id: '3',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt condimentum urna eget dictum. Cras facilisis eget arcu a dignissim. Maecenas scelerisque ullamcorper elementum. Fusce sit amet eros sed nunc vulputate lobortis vitae at eros. Integer feugiat, erat vitae cursus ultrices, ante urna vestibulum elit, quis dictum diam orci eu libero. Cras suscipit placerat eros, non lobortis purus euismod sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus blandit eget dolor ac cursus. Suspendisse malesuada ullamcorper risus, vel vestibulum est. Phasellus quis leo ut ipsum laoreet tincidunt. Cras urna enim, imperdiet vel libero eget, dapibus commodo erat. Aliquam quis quam et libero feugiat dignissim.

Donec mattis pellentesque lorem vel semper. Etiam non ipsum eget orci molestie lobortis. Etiam pretium augue tristique, lacinia odio sit amet, commodo magna. Fusce quis elit vitae eros dictum posuere in at sapien. Suspendisse potenti. Sed lacinia, augue id pretium blandit, turpis nisl fringilla purus, efficitur pellentesque est nibh at est. Nulla a sodales mauris, at commodo ante.

Integer lacinia interdum orci, vitae fermentum enim suscipit commodo. Nulla eu leo eget arcu semper faucibus at non risus. Nullam porta erat eu erat molestie facilisis. Proin molestie, purus vel ullamcorper aliquam, nibh quam malesuada felis, sed pulvinar neque tortor et erat. Mauris sed ex non lorem dignissim auctor. Fusce mollis cursus luctus. Donec ullamcorper pellentesque est, nec vestibulum purus fringilla sit amet. Suspendisse scelerisque dignissim ligula vitae accumsan. Aliquam aliquet dui vitae porttitor mattis. Duis ut metus non leo molestie pulvinar non quis tortor. Ut imperdiet nisl quis ipsum fringilla placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec quam at odio rhoncus faucibus. Nam at tellus pretium, suscipit diam vitae, volutpat purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis ullamcorper lorem libero, eget mollis libero malesuada at.`,
        postImg: mockPostImg,
    },
]

const PostList = () => {
  return (
    <div className={s.postList}>
        {posts.map(post=><PostItem key={post._id} {...post}/>)}
    </div>
  )
}

export default PostList