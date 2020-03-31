<template>
    <div>
        <div class="container">
            <div class="section">
                <h1 class="has-text-centered">file uploader using multer</h1>

                <div class="image">
                    <img class="avatar" src="/img/user.png">
                </div>
            </div>
            <input
                    type="file"
                    @change="selectFile"
                    ref="file"
            />
            <button @click="sendFile" class="button is-primary my-5">Upload image</button>
        </div>



    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                file:''
            }
        },

        mounted() {
            this.sendFile()
        },

        methods:{

            selectFile() {
                this.file = this.$refs.file.files[0];

            },

            async sendFile() {

                const formData = new FormData();
                formData.append('file', this.file);


                try {
                    await axios.post(`/api/profile/`, formData);
                    this.message = "image has been uploaded ";

                    setTimeout(function () {
                        location = ''
                    }, 3000);


                } catch (err) {
                    // console.log(err);
                }

            },
        }

    }
</script>

<style scoped>

    .avatar{
        height: 50px;
        width:50px
    }

</style>
