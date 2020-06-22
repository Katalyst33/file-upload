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

            <DropZone/>

        </div>
    </div>
</template>

<script>
    import simpleUpload from "../components/simpleUpload";
    import multipleUpload from "../components/multipleUpload"
    import DropZone from "../components/DropZone"

    export default {
        components: {
            simpleUpload,
            multipleUpload,
            DropZone
        }

    }
</script>

<style scoped>

</style>
