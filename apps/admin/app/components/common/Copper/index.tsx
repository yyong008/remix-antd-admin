import "react-image-crop/dist/ReactCrop.css";
import "./cropper-modal.css";

import { Button, Modal, Space } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";

type CropperProps = {
  open?: boolean;
  onOk?: (canvas: HTMLCanvasElement | null) => void;
  onCancel?: () => void;
  imageSrc: string;
  aspect?: number;
  circular?: boolean;
  initialWidth?: number;
  initialHeight?: number;
};

const FILE_HINTS = "支持 JPG、PNG、GIF、WebP，最大 2MB";

export function Cropper({
  open = true,
  onOk,
  onCancel,
  imageSrc,
  aspect = 1,
  circular = true,
  initialWidth: _initialWidth = 200,
  initialHeight: _initialHeight = 200,
}: CropperProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outFile, setOutFile] = useState<HTMLCanvasElement | null>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const el = e.currentTarget;
      const displayedWidth = el.width;
      const displayedHeight = el.height;
      if (!displayedWidth || !displayedHeight) return;

      // 以较短边为基准，确保选框不超过图片范围
      const shorterSide = Math.min(displayedWidth, displayedHeight);
      // 初始选框占图片较短边的 80%
      const initW = Math.round(shorterSide * 0.8);
      const initH = circular ? initW : Math.round(initW / aspect);

      const initX = Math.round((displayedWidth - initW) / 2);
      const initY = Math.round((displayedHeight - initH) / 2);

      const initialCrop: PixelCrop = {
        unit: "px",
        x: initX,
        y: initY,
        width: initW,
        height: initH,
      };
      setCrop(initialCrop);
      setCompletedCrop(initialCrop);
    },
    [aspect, circular],
  );

  useEffect(() => {
    if (!completedCrop || !imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio || 1;

    const cropWidth = Math.floor(completedCrop.width * scaleX);
    const cropHeight = Math.floor(completedCrop.height * scaleY);

    canvas.width = cropWidth * pixelRatio;
    canvas.height = cropHeight * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight,
    );

    if (circular) {
      const outputCanvas = document.createElement("canvas");
      const outputCtx = outputCanvas.getContext("2d");
      if (!outputCtx) return;

      const minSide = Math.min(canvas.width, canvas.height);
      outputCanvas.width = minSide;
      outputCanvas.height = minSide;

      outputCtx.beginPath();
      outputCtx.arc(minSide / 2, minSide / 2, minSide / 2, 0, 2 * Math.PI);
      outputCtx.closePath();
      outputCtx.clip();

      const offsetX = (minSide - canvas.width) / 2;
      const offsetY = (minSide - canvas.height) / 2;
      outputCtx.drawImage(canvas, offsetX, offsetY);

      setPreviewUrl(outputCanvas.toDataURL("image/png"));
      setOutFile(outputCanvas);
    } else {
      setPreviewUrl(canvas.toDataURL("image/png"));
      setOutFile(canvas);
    }
  }, [completedCrop, circular]);

  useEffect(() => {
    if (!open) {
      setPreviewUrl(null);
      setOutFile(null);
      setCompletedCrop(null);
    }
  }, [open]);

  const handleOk = () => {
    onOk?.(outFile);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <Modal
      open={open}
      title="裁剪头像"
      width={900}
      centered
      destroyOnHidden
      maskClosable={false}
      zIndex={1100}
      className="rr-cropper-modal"
      styles={{ footer: { marginTop: 0 } }}
      onCancel={handleCancel}
      footer={
        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" disabled={!outFile} onClick={handleOk}>
            确认裁剪
          </Button>
        </Space>
      }
    >
      <div className="rr-cropper-modal__body">
        <div className="rr-cropper-modal__stage">
          <div className="rr-cropper-modal__stage-hint">拖动选框调整裁剪区域</div>
          <div className="rr-cropper-modal__crop-wrap">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              circularCrop={circular}
            >
              <img
                ref={imgRef}
                alt=""
                src={imageSrc}
                onLoad={onImageLoad}
                crossOrigin="anonymous"
              />
            </ReactCrop>
          </div>
          <div className="rr-cropper-modal__file-hint">{FILE_HINTS}</div>
        </div>

        <aside className="rr-cropper-modal__preview">
          <div className="rr-cropper-modal__preview-inner">
            <div className="rr-cropper-modal__preview-title">头像预览</div>
            <div
              className={`rr-cropper-modal__preview-img-wrap${circular ? "" : " rr-cropper-modal__preview-img-wrap--rect"}`}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="" />
              ) : (
                <div className="rr-cropper-modal__preview-placeholder">调整选框后显示</div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </Modal>
  );
}
