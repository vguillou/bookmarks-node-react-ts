import styled, { keyframes } from 'styled-components'

export const breakpoints = {
    MAX_PHONE: '425px',
    MAX_TABLET: '768px',
    MAX_DESKTOP_S: '1024px',
    MAX_DESKTOP_M: '1440px',
}

const stringToRgba = (str: string = 'oups', alpha: number) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        colour += ('00' + value.toString(16)).substr(-2)
    }
    return hexToRGB(colour, alpha)
}

const hexToRGB = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
    }
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

export const Grid = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(1, 1fr);
    gap: 8px 8px;
    margin: 16px 0;

    @media (min-width: ${breakpoints.MAX_TABLET}) {
        grid-template-columns: repeat(2, 1fr);
    }
`

export const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 8px 16px;
    border-radius: 4px;
    min-height: 150px;
    color: inherit;
    text-decoration: inherit;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    font-weight: 600;
    overflow: hidden;

    &::after {
        content: '';
        background-image: url(${(props: { img?: string }) => props.img});
        background-size: cover;
        background-position: center;
        opacity: 0.4;
        filter: blur(2px);
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .header {
        flex: 1;
    }

    a,
    a:hover,
    a:visited,
    a:link,
    a:active {
        display: block;
        color: inherit;
        text-decoration: inherit;
    }

    .bottom-bar {
        flex-shrink: 0;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        * {
            margin-left: 4px;
            margin-bottom: 4px;
        }

        .button-bar {
            flex-shrink: 0;
            align-self: flex-end;
            margin-bottom: 0;
        }
    }
`

export const ButtonBar = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 16px 0;

    * {
        margin-left: 4px;
    }
`

export const TagsInputContainer = styled.div`
    display: flex;
    align-items: center;

    div {
        margin: 4px;
    }

    input {
        max-width: 200px;
        margin: 0;
    }
`

export const Chip = styled.span`
    align-items: center;
    display: inline-flex;
    justify-content: center;
    background-color: ${(props) => stringToRgba(props.children?.toString(), 0.45)};
    border-radius: 9999px;
    padding: 4px 8px;
    margin-right: 4px;
    font-size: 0.7em;

    ${(props: { removable?: boolean }) =>
        props.removable
            ? `
    cursor: pointer;

    &::after {
      padding-left: 8px;
      content: "X";
      font-weight: bold;
    }`
            : ''}
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SpinnerContainer = styled.div`
    width: 100%;
    margin: 100px 0;
`

export const Spinner = styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);

    border-top: 2px solid grey;
    border-right: 2px solid grey;
    border-bottom: 2px solid grey;
    border-left: 4px solid black;
    background: transparent;
    width: 64px;
    height: 64px;
    border-radius: 50%;

    margin: 0 auto;
`

export const MediaContainer = styled.div`
    width: 100%;
    margin: 16px auto;

    * {
        text-align: center;
    }

    img {
        width: 100%;
    }
`

export const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 16px;

    *:nth-child(odd) {
        width: 50px;
    }

    *:nth-child(even) {
        margin-bottom: 10px;
    }
`
