/**
 * Describes a logger action.
 */
export declare type LoggerAction = (msg: string) => void;
/**
 * Describes a callback for starting a payment.
 */
export declare type StartPayPalPaymentCallback = (resultCtx: IStartPayPalPaymentCallbackResult) => void;
/**
 * Describes a payment.
 */
export interface IPayPalPayment {
    /**
     * Gets the amount. Default: 0
     */
    getAmount(): number;
    /**
     * Gets the Build Notation code.
     */
    getBnCode(): string;
    /**
     * Gets the currency. Default: 'USD'
     */
    getCurrency(): string;
    /**
     * Gets the optional app provided custom payment field.
     */
    getCustom(): string;
    /**
     * Gets the description.
     */
    getDescription(): string;
    /**
     * Gets the details.
     */
    getDetails(): IPayPalPaymentDetails;
    /**
     * Gets the invoice number.
     */
    getInvoiceNumber(): string;
    /**
     * Sets the amount.
     *
     * @param {number} newAmount The new value.
     *
     * @chainable
     */
    setAmount(newAmount: number): IPayPalPayment;
    /**
     * Sets the Build Notation code.
     *
     * @param {number} newBnCode The new value.
     *
     * @chainable
     */
    setBnCode(newBnCode: string): any;
    /**
     * Sets the currency.
     *
     * @param {number} newCurrency The new value.
     *
     * @chainable
     */
    setCurrency(newCurrency: string): IPayPalPayment;
    /**
     * Sets the custom app provided payment field.
     *
     * @param {number} newCustom The new value.
     *
     * @chainable
     */
    setCustom(newCustom: string): IPayPalPayment;
    /**
     * Sets the description.
     *
     * @param {string} newDescription The new value.
     *
     * @chainable
     */
    setDescription(newDescription: string): IPayPalPayment;
    /**
     * Sets the payment details.
     *
     * @param {number} shipping Amount charged for shipping.
     * @param {number} subtotal Sub-total (amount) of items being paid for.
     * @param {number} tax Amount charged for tax.
     *
     * @chainable
     */
    setDetails(shipping: number, subtotal: number, tax: number): IPayPalPayment;
    /**
     * Sets the invoice number.
     *
     * @param {string} newInvoiceNumber The new value.
     *
     * @chainable
     */
    setInvoiceNumber(newInvoiceNumber: string): IPayPalPayment;
    /**
     * Starts the payment operation.
     *
     * @param {StartPayPalPaymentCallback} [cb] The optional callback.
     *
     * @return {boolean} Operation was successful or not.
     */
    start(cb?: StartPayPalPaymentCallback): boolean;
}
/**
 * Payment details.
 */
export interface IPayPalPaymentDetails {
    /**
     * Amount charged for shipping.
     */
    shipping: number;
    /**
     * Sub-total (amount) of items being paid for.
     */
    subtotal: number;
    /**
     * Amount charged for tax.
     */
    tax: number;
}
/**
 * Environment configuration.
 */
export interface IPayPalConfig {
    /**
     * Accept credit cards or not. Default: (true)
     */
    acceptCreditCards?: boolean;
    /**
     * Account / merchant settings.
     */
    account?: {
        /**
         * Merchant name.
         */
        name?: string;
        /**
         * URL of merchant's privacy policy.
         */
        privacyPolicy?: string;
        /**
         * URL of merchant's user aggreement.
         */
        userAgreement?: string;
    };
    /**
     * The custom android activity to use.
     */
    activity?: any;
    /**
     * The client ID for production mode.
     */
    clientId?: string;
    /**
     * Default settings.
     */
    defaults?: {
        /**
         * User's eMail address.
         */
        userEmail?: string;
        /**
         * User's phone.
         */
        userPhone?: string;
        /**
         * User's phone country code.
         */
        userPhoneCountryCode?: string;
    };
    /**
     * The explicit environment to use.
     */
    environment?: PayPalEnvironment;
    /**
     * Language. Default: 'en_US'
     */
    lang?: string;
    /**
     * [Andoird only] Fallback activity result.
     */
    onActivityResult?: (requestCode: number, resultCode: number, data: any) => void;
    /**
     * The request code (especially for Android activity result). Default: 230958624
     */
    requestCode?: number;
    /**
     * Remember last user or not. Default: (true)
     */
    rememberUser?: boolean;
}
/**
 * Describes a result for a callback that (tried) to start a payment.
 */
export interface IStartPayPalPaymentCallbackResult {
    /**
     * The code.
     */
    code: number;
    /**
     * The key (if succeeded).
     */
    key?: string;
    /**
     * The (error) message.
     */
    message?: any;
}
/**
 * List of environments.
 */
export declare enum PayPalEnvironment {
    /**
     * SandBox
     */
    SandBox = 0,
    /**
     * Productive
     */
    Production = 1,
    /**
     * No network
     */
    NoNetwork = 2,
}
/**
 * Adds a logger (action).
 *
 * @param {LoggerAction} l The action to add.
 */
export declare function addLogger(l: LoggerAction): void;
/**
 * Initializes the environment.
 *
 * @param {IPayPalConfig} [cfg] The configuration to use.
 *
 * @param {boolean} Operation was successful or not.
 */
export declare function init(cfg?: IPayPalConfig): boolean;
/**
 * Creates a new payment.
 *
 * @return {IPayPalPayment} The new payment.
 */
export declare function newPayment(): IPayPalPayment;