import { ChangeDetectorRef, DoCheck, ElementRef, IterableDiffers, NgZone, OnInit } from '@angular/core';
import { FcCallbacks, FcEdge, FcModel, UserCallbacks, UserNodeCallbacks } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import { FcModelValidationService } from './modelvalidation.service';
import { FcNodeDraggingService } from './node-dragging.service';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { FcEdgeDraggingService } from './edge-dragging.service';
import { FcMouseOverService } from './mouseover.service';
import { FcRectangleSelectService } from './rectangleselect.service';
export declare class NgxFlowchartComponent implements OnInit, DoCheck {
    private elementRef;
    private differs;
    private modelValidation;
    edgeDrawingService: FcEdgeDrawingService;
    private cd;
    private zone;
    readonly canvasClass: string;
    model: FcModel;
    selectedObjects: any[];
    edgeStyle: string;
    userCallbacks: UserCallbacks;
    automaticResize: boolean;
    dragAnimation: string;
    nodeWidth: number;
    nodeHeight: number;
    dropTargetId: string;
    callbacks: FcCallbacks;
    userNodeCallbacks: UserNodeCallbacks;
    modelService: FcModelService;
    nodeDraggingService: FcNodeDraggingService;
    edgeDraggingService: FcEdgeDraggingService;
    mouseoverService: FcMouseOverService;
    rectangleSelectService: FcRectangleSelectService;
    arrowDefId: string;
    arrowDefIdSelected: string;
    flowchartConstants: {
        htmlPrefix: string;
        leftConnectorType: string;
        rightConnectorType: string;
        curvedStyle: string;
        lineStyle: string;
        dragAnimationRepaint: string;
        dragAnimationShadow: string;
        canvasClass: string;
        selectedClass: string;
        editClass: string;
        activeClass: string;
        hoverClass: string;
        draggingClass: string;
        edgeClass: string;
        edgeLabelClass: string;
        connectorClass: string;
        magnetClass: string;
        nodeClass: string;
        nodeOverlayClass: string;
        leftConnectorClass: string;
        rightConnectorClass: string;
        canvasResizeThreshold: number;
        canvasResizeStep: number;
    };
    private nodesDiffer;
    private edgesDiffer;
    constructor(elementRef: ElementRef<HTMLElement>, differs: IterableDiffers, modelValidation: FcModelValidationService, edgeDrawingService: FcEdgeDrawingService, cd: ChangeDetectorRef, zone: NgZone);
    ngOnInit(): void;
    ngDoCheck(): void;
    getEdgeDAttribute(edge: FcEdge): string;
    adjustCanvasSize(fit?: boolean): void;
    canvasClick(event: MouseEvent): void;
    edgeMouseDown(event: MouseEvent, edge: FcEdge): void;
    edgeClick(event: MouseEvent, edge: FcEdge): void;
    edgeRemove(event: Event, edge: FcEdge): void;
    edgeEdit(event: Event, edge: FcEdge): void;
    edgeDoubleClick(event: MouseEvent, edge: FcEdge): void;
    edgeMouseOver(event: MouseEvent, edge: FcEdge): void;
    edgeMouseEnter(event: MouseEvent, edge: FcEdge): void;
    edgeMouseLeave(event: MouseEvent, edge: FcEdge): void;
    dragover(event: DragEvent): void;
    drop(event: DragEvent): void;
    mousedown(event: MouseEvent): void;
    mousemove(event: MouseEvent): void;
    mouseup(event: MouseEvent): void;
}