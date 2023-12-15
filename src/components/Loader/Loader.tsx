import { Backdrop, CircularProgress } from "@mui/material"

interface LoaderProps {
    isLoading: boolean
}
export default function Loader(props: LoaderProps) {
    const { isLoading } = props
    return (

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            data-testid="loader-backdrop"
        >
            <CircularProgress color="inherit" data-testid="loader-circular-progress" />
        </Backdrop>
    )
}