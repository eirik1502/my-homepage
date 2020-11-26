import React from 'react'

const TextBounds = () => {
    return (
        <>
            <div
                style={{
                    width: '50%',
                    height: '50%',
                    float: 'left',
                    shapeOutside: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
            />
            <div
                style={{
                    width: '50%',
                    height: '100%',
                    float: 'right',
                    shapeOutside: 'polygon(100% 0, 100% 100%, 0 100%)',
                }}
            />
            <div
                style={{
                    width: '50%',
                    height: '50%',
                    float: 'left',
                    shapeOutside: 'polygon(50% 0, 100% 100%, 0 100%, 0 0)',
                }}
            />
        </>
    )
}

export default TextBounds
