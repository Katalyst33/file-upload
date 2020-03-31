<template>
    <div class="section">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <simpleUpload/>
                </div>
                <div class="column">
                    <multipleUpload/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import simpleUpload from "../components/simpleUpload";
    import multipleUpload from "../components/multipleUpload"

    export default {
        components: {
            simpleUpload,
            multipleUpload
        }

    }
</script>

<style scoped>

</style>
