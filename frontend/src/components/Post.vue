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
                    {{ post.votesCount }}
                </div>
                <button class="vote-down" @click="voteDown">
                    <i class="far fa-thumbs-down"></i>
                </button>
            </div>
        </div>
        <div class="post">
            <div class="post-author">
                <span>Posted by : {{ post.author }}</span>
                <a :href="post.authorURL"></a>
            </div>
            <div class="post-title">
                <span>
                    <a href="">
                        <h2>{{ post.title }}</h2>
                    </a>
                </span>
            </div>
            <div class="post-content">
                <p>{{ post.content }}</p>
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
        },

        voteDown(){
            // do vote down request
            // location.reload()
        },

    },

}
</script>

<style lang="scss">
    .post-block{
        position: relative;
        margin: 40px 60px;
        padding-left: 60px;
        border: 1px solid #cccccc;
        border-radius: 4px;

        .rank{
            position: absolute;
            width: 20px;
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
            left: 20px;
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