<template>
    <div class="container">
        <div class="section">
            <form @submit.prevent="sendFile" enctype="multipart/form-data">

                <div v-if="message"
                     :class="`message ${error ? 'is-danger': 'is-success'}`"
                >
                    <div class="message-body">{{message}}</div>
                </div>

                <div class="field">

                    <div class="file is-boxed is-primary">
                        <label class="file-label">

                            <input
                                    type="file"
                                    ref="file"
                                    @change="selectFile"
                                    class="file-input"
                            />

                            <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-uploader"></i>
                            </span>
                            <span class="file-label">
                                Choose a file...
                            </span>

                        </span>
                            <span v-if="file" class="file-name">{{file.name}}</span>
                        </label>
                    </div>
                    <label for="file" class="label">
                        Upload File
                    </label>

                </div>

                <div class="field">
                    <button class="button is-info">Send</button>
                </div>


            </form>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "SimpleUpload",
        data() {
            return {
                file: "",
                message: '',
                error: false
            }
        },

        mounted() {

        },

        methods: {
            selectFile() {
                const file = this.$refs.file.files[0];
                const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
                const MAX_SIZE = 200000;
                const tooLarge = file.size > MAX_SIZE;

                if(allowedTypes.includes(file.type) && !tooLarge){
                    this.file = file;
                    this.error = false;
                    this.message = "";
                }else{
                    this.error = true;
                    this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}kb `:"only images are allowed";
                }

            },
            async check() {

                try {
                    await axios.get('/api/uploader')


                } catch (e) {
                    return e;
                }
            },

            async sendFile() {
                const formData = new FormData();
                formData.append('file', this.file);
                try {
                    await axios.post('/api/uploader', formData);
                    this.message = "File has been uploaded";
                    this.error = false;
                    this.file = ""

                } catch (err) {
                    this.message = err.response.data.error;
                    this.error = true;

                }

            },


        }
    }
</script>

<style scoped>

</style>
