import React, { useState } from 'react'
import _uniqueId from 'lodash/uniqueId'
import { Button } from '@material-ui/core'

export const ImageUploadButton = props => {

    if (typeof props.onChange != "function") {
        console.error("onChange must be a function")
    }

    const { onChange = () => {}, passEventOnChange = false, imageRef = null } = props;

    const [id] = useState(_uniqueId("image-upload-button-"))

    const _onChange = e => {
        let file = e.target.files[0]
        if (imageRef) {
            imageRef.current.src = URL.createObjectURL(file)
        }
        onChange(passEventOnChange ? e : e.target.files[0])
    }

    return (
        <>
            <input
                accept="image/*"
                style={{"display": "none"}}
                id={id}
                type="file"
                onChange={_onChange}
            />
            <label htmlFor={id}>
                {props.children ?
                    props.children :
                    <Button variant="outlined" style={{"color": "#d11", "borderColor": "#d11"}} component="span">
                        Upload
                    </Button>
                }
            </label>
        </>
    )
}

const API_URL_BASE = "http://localhost:3000"
export const IMAGE_ENDPOINT_URL_BASE = "https://mubc-api-image.s3.us-east-2.amazonaws.com/"
export const UploadToAws = async (file, callback) => {
    if (typeof callback != "function") {
        console.error("A callback must be provided as the second parameter")
    }

    let body = new FormData(), headers = {} //fetch will automatically add content header
    body.append("image", file)
    const resp = await fetch(API_URL_BASE + "/api/image", {method: "POST", headers, body})
    if (!resp.ok) {
        console.error("Server responded with error: " + resp.status + "\n" + resp)
        return null
    }
    const url = ShortenAwsUrl(await resp.text())
    callback(url)
}

export const ShortenAwsUrl = url => url.replace(IMAGE_ENDPOINT_URL_BASE, "")
export const ExpandAwsUrl = url => IMAGE_ENDPOINT_URL_BASE + url

/*
// TODO: Move documentation elsewhere
import { ImageUploadButton, UploadToAws, ExpandAwsUrl, ShortenAwsUrl } from './../image-upload-utils'

///// Using ImageUploadButton

// Add this element to create a clickable button to upload images
<ImageUploadButton onChange={handleSelectedFileChange}
                   imageRef={imageRef} // OPTIONAL
                   />

// onChange event is fired when a file is selected, it passes the file object to the handeler
const [ selectedFile, setSelectedFile ] = useState()
const handleSelectedFileChange = file => {
    setSelectedFile(file)
}

// OPTIONAL imageRef is used to immediately update an <img> to the image the user selected
const imageRef = React.createRef() // create ref
<img src="..." ref={imageRef}/>
<ImageUploadButton onChange={handleSelectedFileChange} imageRef={imageRef} />

// You can also supply your own elements inside to override the default styling
<ImageUploadButton>
    <Button>
        ...
    </Button>
</ImageUploadButton>


///// Using UploadToAws

// Call UploadToAws and pass the file to be uploaded along with a callback for when the url of the image is received
// Side note: the url is automatically shortened to only be the image filename. This saves space in the contarct. To get the original
// url, use ExpandAwsUrl
UploadToAws(selectedFile, url => {
    contract.makeBountry({url}) // example use
    console.log(ExpandAwsUrl(url))
})

// An expanded url can also be shortened by using ShortenAwsUrl
console.log(ShortenAwsUrl(longUrl))

*/
