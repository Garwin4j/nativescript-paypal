// The MIT License (MIT)
// 
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

const Device = require('./Device');


/**
 * Configuration to setup the environment.
 */
export interface IPayPalConfig {
    /**
     * Account settings
     */
    account?: {
        /**
         * Your company name, as it should be displayed to the user when requesting consent for future payments.
         */
        name?: string;
        /**
         * URL of your company's privacy policy, which will be offered to the user when requesting consent for future payments.
         */
        privacyPolicy?: string;
        /**
         * URL of your company's user agreement, which will be offered to the user when requesting consent for future payments.
         */
        userAgreement?: string;
    };
    /**
     * The ID of the requesting client (app).
     */
    clientId?: string;
    /**
     * Defaults
     */
    defaults?: {
        /**
         * Optional string that pre-populates email login if no other information is available.
         */
        userEmail?: string;
        /**
         * Optional string that pre-populates phone number login if no other information is available.
         */
        userPhone?: string;
        /**
         * Optional string that indicates the country code of the specified userPhone.
         */
        userPhoneCountryCode?: string;
    },
    /**
     * The environment to use. Default: Sandbox
     */
    environment?: PayPalEnvironment;
    /**
     * The language to use. Default: 'en_US'
     */
    lang?: string;
    /**
     * Fallback for an activity result if requestCode of that config object does not match (Android only).
     */
    onActivityResult?: (requestCode: number, resultCode: number, intent: any) => void;
    /**
     * Remember user or not. Default: (true)
     */
    rememberUser?: boolean;
    /**
     * The request code (Android only). Default: 230958624
     */
    requestCode?: number;
}

/**
 * A payment.
 */
export interface IPayPalPayment {
    /**
     * Gets the price / amount. Default: 0
     * 
     * @return {number} The amount.
     */
    readonly getAmount: () => number;
    /**
     * Gets the optional Build Notation code (BN code) for partner tracking.
     * 
     * @return {string} The BN code.
     */
    readonly getBnCode: () => string;
    /**
     * Gets the currency (Default: 'USD').
     * 
     * @return {string} The currency.
     */
    readonly getCurrency: () => string;
    /**
     * Gets the optional app-provided custom payment field.
     * 
     * @return {string} The custom payment field.
     */
    readonly getCustom: () => string;
    /**
     * Gets the description.
     * 
     * @return {string} The description.
     */
    readonly getDescription: () => string;
    /**
     * Gets the details for the payment (if defined).
     */
    readonly getDetails: () => IPayPalPaymentDetails | null;
    /**
     * Gets the invoice number.
     * 
     * @return {string} The invoice number.
     */
    readonly getInvoiceNumber: () => string;
    /**
     * Sets the price / amount.
     * 
     * @param {number} newAmount The new value.
     * 
     * @chainable
     */
    readonly setAmount: (newAmount: number) => IPayPalPayment;
    /**
     * Sets the optional app-provided custom payment field.
     * 
     * @param {string} newCustom The new value.
     * 
     * @chainable
     */
    readonly setCustom: (newCustom: string) => IPayPalPayment;
    /**
     * Sets the currency.
     * 
     * @param {string} newCurrency The new value.
     * 
     * @chainable
     */
    readonly setCurrency: (newCurrency: string) => IPayPalPayment;
    /**
     * Sets the description.
     * 
     * @param {string} newDescription The new value.
     * 
     * @chainable
     */
    readonly setDescription: (newDescription: string) => IPayPalPayment;
    /**
     * Sets the details for the payment.
     * 
     * @param {number} shipping Amount charged for shipping. 10 characters max with support for 2 decimal places.
     * @param {number} subtotal Sub-total (amount) of items being paid for. 10 characters max with support for 2 decimal places.
     * @param {number} tax Amount charged for tax. 10 characters max with support for 2 decimal places.
     * 
     * @chainable
     */
    readonly setDetails: (shipping: number, subtotal: number, tax: number) => IPayPalPayment;
    /**
     * Sets the invoice number.
     * 
     * @param {string} newInvoiceNumber The new value.
     * 
     * @chainable
     */
    readonly setInvoiceNumber: (newInvoiceNumber: string) => IPayPalPayment;
    /**
     * Sets the optional Build Notation code (BN code) for partner tracking.
     * 
     * @param {string} newBnCode The new value.
     * 
     * @chainable
     */
    readonly setBnCode: (newBnCode: string) => IPayPalPayment;
    /**
     * Starts a payment.
     * 
     * @param {PaymentCallback} [cb] The callback.
     * 
     * @return {boolean} Operation was successful or not.
     */
    readonly start: (cb?: PaymentCallback) => boolean;
}

/**
 * Details for a payment.
 */
export interface IPayPalPaymentDetails {
    /**
     * Amount charged for shipping. 10 characters max with support for 2 decimal places.
     */
    readonly shipping: number;
    /**
     * Sub-total (amount) of items being paid for. 10 characters max with support for 2 decimal places.
     */
    readonly subtotal: number;
    /**
     * Amount charged for tax. 10 characters max with support for 2 decimal places.
     */
    readonly tax: number;
}

/**
 * A logger callback.
 * 
 * @param {string} msg The message to log.
 */
export type LoggerCallback = (msg: string) => void;

/**
 * A callback for a payment.
 * 
 * @param {PaymentResult} result The result (context).
 */
export type PaymentCallback = (result: PaymentResult) => void;

/**
 * A result of a payment.
 */
export interface PaymentResult {
    /**
     * The code.
     */
    readonly code: number;
    /**
     * The key of the payment (if code = 0).
     */
    readonly key?: string;
    /**
     * The message.
     */
    readonly message?: string;
}

/**
 * List of environments.
 */
export enum PayPalEnvironment {
    /**
     * Sandbox
     */
    Sandbox = 0,
    /**
     * Production.
     */
    Production = 1,
    /**
     * No network
     */
    NoNetwork = 2,
}


/**
 * Adds a logger (callback).
 * 
 * @param {LoggerCallback} l The callback to add.
 */
export function addLogger(l: LoggerCallback) {
    Device.addLogger(l);
}

/**
 * Initializes the environment to use PayPal.
 * 
 * @param {IPayPalConfig} [cfg] The configuration.
 */
export function init(cfg?: IPayPalConfig): void {
    Device.init(cfg);
}

/**
 * Starts a new payment.
 * 
 * @return {IPayPalPayment} The new payment.
 */
export function newPayment(): IPayPalPayment {
    return Device.newPayment();
}
