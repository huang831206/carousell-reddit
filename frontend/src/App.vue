<template>
    <div id="app">
        <div class="header">
            <h1>Top 20 Popular Posts</h1>
        </div>
        <div class="posts-container">
            <!-- i for indicating it's rank -->
            <Post v-for="(post,index) in posts" :post="post" :key="post.id" :i="index"></Post>
        </div>
    </div>
</template>

<script>
import Post from "./components/Post.vue";

export default {
    name: "app",
    components: {
        Post
    },
    data(){
        // some dummy data
        return {
            posts: [
                {
                    id: 'p1',
                    title: 'post1',
                    author: 'ben1',
                    authorURL: 'ben1',
                    votesCount: 999,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deserunt ipsam iure laboriosam expedita tempora totam, animi in dolorem vero. At, mollitia. Similique debitis aliquam, laudantium magni corporis et excepturi.',
                },
                {
                    id: 'p2',
                    title: 'post2',
                    author: 'ben2',
                    authorURL: 'ben2',
                    votesCount: 99,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deserunt ipsam iure laboriosam expedita tempora totam, animi in dolorem vero. At, mollitia. Similique debitis aliquam, laudantium magni corporis et excepturi.',
                },
                {
                    id: 'p3',
                    title: 'post3',
                    author: 'ben3',
                    authorURL: 'ben3',
                    votesCount: 9,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deserunt ipsam iure laboriosam expedita tempora totam, animi in dolorem vero. At, mollitia. Similique debitis aliquam, laudantium magni corporis et excepturi.',
                }
            ]
        }
    }
};
</script>

<style lang="scss">
    html, body{
        height: 100%;
        margin: 0;
        overflow: hidden;
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;

        div.header{
            height: 7%;
        }

        div.posts-container{
            height: 75%;
            overflow: scroll;
            margin: 0 20px;
            border: 1px solid #cccccc;
            border-radius: 4px;
        }

    }
</style>
