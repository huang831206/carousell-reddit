<template lang="html">
    <div class="post-block" :data-id="post.id">
        <div class="rank">
            <span>{{ i + 1 }}</span>
        </div>
        <div class="vote-actions">
            <div class="vote-buttons">
                <button class="vote-up" @click="voteUp">
                    <i class="far fa-thumbs-up"></i>
                </button>
                <div class="votes-count">
                    {{ post.upVotes }}
                </div>
                <button class="vote-down" @click="voteDown">
                    <i class="far fa-thumbs-down"></i>
                </button>
            </div>
        </div>
        <div class="post">
            <div class="post-author">
                <span>Posted by : {{ decodeURIComponent(post.author) }}</span>
                <a :href="post.authorURL"></a>
            </div>
            <div class="post-title">
                <span>
                    <a href="">
                        <h2>{{ decodeURIComponent(post.title) }}</h2>
                    </a>
                </span>
            </div>
            <div class="post-content">
                <p>{{ decodeURIComponent(post.content) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            default: () => {
                return {
                    id: '',
                    title: '',
                    author: '',
                    authorURL: '',
                    votesCount: 0,
                    content: '',
                }
            }
        },
        i: Number
    },

    data() {
        return {

        }
    },

    created() {

    },

    mounted() {
        this.$nextTick( () => {

        })
    },

    methods: {
        voteUp(){
            // do vote up request
            // location.reload()
            this.voteAction('upVotes', () => {})
        },

        voteDown(){
            // do vote down request
            // location.reload()
            this.voteAction('downVotes', () => {})
        },

        voteAction(type, callback){
            let data = {
                id: this.post.id,
                type: type
            }

            fetch('http://localhost:3000/post/vote', {
                method: 'POST',
                headers: {
                   'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then( res => res.json())
            .then(callback)
            .then( () =>{ 
                location.reload()
            })
            .catch( err => {
                // eslint-disable-next-line
                console.warn(err)
            })
        }

    },

}
</script>

<style lang="scss">
    .post-block{
        position: relative;
        margin: 40px 60px;
        padding-left: 75px;
        border: 1px solid #cccccc;
        border-radius: 4px;

        .rank{
            position: absolute;
            width: 35px;
            height: 100%;
            align-items: center;
            display: flex;
            left: 0;
            background-color: #eeeeee;

            span{
                margin: auto;
                &::before{
                    content: "#";
                }
            }
        }

        .vote-actions{
            position: absolute;
            width: 40px;
            height: 100%;
            align-items: center;
            display: flex;
            left: 35px;
            background-color: #f8f9fa;

            .vote-buttons{
                margin: auto;

                button{
                    border: none;
                    cursor: pointer;
                    background-color: transparent;
                }
            }
        }

        .post{
            position: relative;
            text-align: left;
            padding-left: 8px;

            a{
                text-decoration: none;
                color: black;
            }
        }
    }
</style>