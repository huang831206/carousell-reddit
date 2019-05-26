<template>
    <div id="app">
        <div class="toggle-all">
            <input type="checkbox" id="toggle-all-post" v-model="toggleAllPost">
            <label for="toggle-all-post">Toggle all posts</label>
        </div>
        <div class="header">
            <h1>{{ toggleAllPost ? 'All Posts' : 'Top 20 Popular Posts'}}</h1>
        </div>
        <div class="posts-container">
            <!-- i for indicating it's rank -->
            <Post v-for="(post,index) in posts" :post="post" :key="post.id" :i="index"></Post>
        </div>
        <div class="new-post-container">
            <div class="name">
                <label for="post-author">name</label>
                <input type="text" id="post-author" name="author" v-model="newPostAuthor">
            </div>
            <div class="title">
                <label for="post-title">title</label>
                <input type="text" id="post-title" name="title" v-model="newPostTitle">
            </div>
            <div class="content">
                <label for="">content</label>
                <textarea type="text" id="post-content" name="content" v-model="newPostContent"></textarea>
            </div>
            <div class="submit-button">
                <button @click="createPost">Submit</button>
            </div>
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
        return {
            toggleAllPost: (localStorage.toggleAllPost === 'true'),
            posts: [],
            newPostAuthor: '',
            newPostTitle: '',
            newPostContent: '',
        }
    },

    created(){
        this.getPosts()
    },

    watch:{
        toggleAllPost: function (toggle) {
            this.toggleAllPost = toggle
            localStorage.toggleAllPost = toggle
            this.getPosts()
        }
    },

    methods: {
        getPosts(){
            fetch(this.toggleAllPost ? 'http://localhost:3000/post/all' : 'http://localhost:3000/post/trendings')
                .then( res => res.json())
                .then( res => {
                    this.posts = res
                })
                .catch( err => {
                    // eslint-disable-next-line
                    console.warn(err)
                })
        },

        createPost(){
  
            if (this.newPostAuthor && this.newPostTitle && this.newPostContent) {
                let data = {
                    author: encodeURIComponent(this.newPostAuthor),
                    title: encodeURIComponent(this.newPostTitle),
                    content: encodeURIComponent(this.newPostContent),
                }

                fetch('http://localhost:3000/post/create', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json())
                    .then( () =>{ 
                        location.reload()
                    })
                    .catch( err => {
                        // eslint-disable-next-line
                        console.warn(err)
                    })
            } else {
                alert('Please fillin the fields correctly.')
            }
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

        div.toggle-all{
            position: fixed;
            top: 0;
            right: 0;
            margin: 20px 20px 0 0;
        }

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

        div.new-post-container{
            display: flex;
            height: 13%;

            div.name{
                width: 10%;
                padding: 0 10px;
                margin: auto;
            }

            div.title{
                width: 15%;
                padding: 0 10px;
                margin: auto;
            }

            div.content{
                width: 65%;
                padding: 0 10px;
                margin: auto;
            }

            div.submit-button{
                width: 10%;
                margin: auto;

                button{
                    cursor: pointer;
                    color: #fff;
                    background-color: #007bff;
                    border-color: #007bff;
                    font-weight: 400;
                    padding: .375rem .75rem;
                    line-height: 1.5;
                    border-radius: .25rem;
                    font-size: 1rem;
                }
            }

            input, textarea{
                width: 100%;
                height: calc(1.5em + .75rem + 2px);
                border-radius: .25rem;
                font-weight: 400;
                line-height: 1.5;
                border: 1px solid #ced4da;
            }

            textarea{
                resize : none;
                height: calc(3rem + 2px);
            }
        }
    }
</style>
