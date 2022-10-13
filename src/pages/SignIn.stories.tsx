import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest"
import { SignIn } from "./SignIn";

export default {

    title: "pages/SignIn",
    component: SignIn

} as Meta

export const Default: StoryObj = {
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText("Digite o seu email"), "don@bob.com")
        userEvent.type(canvas.getByPlaceholderText("****"), "12345")

        userEvent.click(canvas.getByText("Entrar na plataforma"))

        await waitFor(() => {
            return expect(canvas.getByText("Login Realizado!")).toBeInTheDocument()
        })
    }
}