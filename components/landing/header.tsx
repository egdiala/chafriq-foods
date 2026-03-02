import { Content } from "../content"
import { Button } from "../ui/button"
import { IconHamMenu, IconShoppingCart, LogoWithTextWhite } from "../icons"

export const Header = () => {
    return (
        <header className="absolute inset-x-0 top-0">
            <Content className="py-0 md:py-0">
                <div className="flex items-center justify-between py-4">
                    <LogoWithTextWhite />
                    <div className="flex items-center justify-end gap-5">
                        <Button type="button" size="icon-big" variant="secondary-dark">
                            <IconShoppingCart />
                        </Button>
                        <div className="md:flex items-center gap-5 hidden">
                            <Button type="button" variant="secondary-dark">
                                Sign in
                            </Button>
                            <Button type="button">
                                Become a Cook
                            </Button>
                        </div>
                        <Button type="button" size="icon-big" className="flex md:hidden">
                            <IconHamMenu />
                        </Button>
                    </div>
                </div>
            </Content>
        </header>
    )
}