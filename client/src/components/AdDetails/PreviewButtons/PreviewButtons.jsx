import React from 'react'
import {ButtonToBackForm, ButtonToConfirm, PreviewButtonsBox} from "./styledComponents"

const PreviewButtons = ({handleCreateAd, handleBack}) => {
    return (
                <PreviewButtonsBox>
                    <ButtonToBackForm
                        variant='outlined'
                        size='large'
                        onClick={handleBack}
                    >
                        Вернуться к форме
                    </ButtonToBackForm>
                    <ButtonToConfirm
                        variant='contained'
                        size='large'
                        onClick={handleCreateAd}
                    >
                        Опубликовать
                    </ButtonToConfirm>
                </PreviewButtonsBox>
    )
}

export default PreviewButtons