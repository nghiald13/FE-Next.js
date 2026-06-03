import CheckoutResultPage from "@/components/checkout/component"

const CheckoutPage = async (
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) => {

    const {
        partnerCode, orderId, requestId,
        amount, orderInfo, orderType,
        transId, resultCode, message,
        payType, responseTime, extraData, signature
    } = await searchParams

    return (
        <>
            <CheckoutResultPage
                partnerCode={partnerCode}
                orderId={orderId}
                requestId={requestId}
                amount={amount}
                orderInfo={orderInfo}
                orderType={orderType}
                transId={transId}
                resultCode={resultCode}
                message={message}
                payType={payType}
                responseTime={responseTime}
                extraData={extraData}
                signature={signature}
            />
        </>
    )
}

export default CheckoutPage