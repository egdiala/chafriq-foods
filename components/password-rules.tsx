import { cn } from "@/lib/utils";
import { IconCheckmarkDouble, IconOctagonMinus } from "./icons";

type Props = {
    value: string;
}

const PASSWORD_RULES = [
    {
        label: "Minimum of six (6) characters",
        isValid: (value: string) => value.length >= 6
    },
    {
        label: "At least one uppercase letter",
        isValid: (value: string) => /[A-Z]/.test(value)
    },
    {
        label: "At least one lowercase letter",
        isValid: (value: string) => /[a-z]/.test(value)
    },
    {
        label: "At least one special character",
        isValid: (value: string) => /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(value)
    }
]

export const PasswordRules = ({ value }: Props) => {
    return (
        <ul className="space-y-1">
        {
            PASSWORD_RULES.map((rule, index) => (
                <li key={index}>
                    <div className="flex items-center gap-1 [&>svg]:shrink-0">
                        {!!rule.isValid(value) ? <IconCheckmarkDouble className="text-success" /> : <IconOctagonMinus className="text-error" />}
                        <span className={cn("text-xs", rule.isValid(value) ? "text-grey-dark-3" : "text-grey-dark-2")}>{rule.label}</span>
                    </div>
                </li>
            ))
        }
        </ul>
    )
}